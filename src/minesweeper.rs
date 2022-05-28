use crate::random::random_range;
use std::{
    collections::HashSet,
    fmt::{Display, Write},
};

pub type Position = (usize, usize);
pub enum OpenResult {
    Mine,
    NoMine(u8),
}

#[derive(Debug)]
pub struct Minesweeper {
    width: usize,
    height: usize,
    open_fields: HashSet<Position>,
    mines: HashSet<Position>,
    flagged_fields: HashSet<Position>,
    pub lost: bool,
    pub won: bool,
}

impl Display for Minesweeper {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        for y in 0..self.height {
            for x in 0..self.width {
                let pos = (x, y);
                if !self.open_fields.contains(&pos) {
                    if self.lost && self.mines.contains(&pos) {
                        f.write_str("💣 ")?;
                    } else if self.flagged_fields.contains(&pos) {
                        f.write_str("🚩 ")?;
                    } else {
                        f.write_str("🟪 ")?;
                    }
                } else if self.mines.contains(&pos) {
                    f.write_str("💣 ")?;
                } else {
                    write!(f, " {} ", self.neighboring_mines(pos))?;
                }
            }

            f.write_char('\n')?;
        }
        Ok(())
    }
}

impl Minesweeper {
    pub fn new(width: usize, height: usize, mine_count: usize) -> Minesweeper {
        Minesweeper {
            width,
            height,
            open_fields: HashSet::new(),
            mines: {
                let mut mines = HashSet::new();

                while mines.len() < mine_count {
                    mines.insert((random_range(0, width), random_range(0, height)));
                }

                mines
            },
            flagged_fields: HashSet::new(),
            lost: false,
            won: false,
        }
    }

    pub fn iter_neighbors(&self, (x, y): Position) -> impl Iterator<Item = Position> {
        let width = self.width;
        let height = self.height;
        (x.max(1) - 1..=x.min(width - 1) + 1)
            .flat_map(move |i| (y.max(1) - 1..=y.min(height - 1) + 1).map(move |j| (i, j)))
            .filter(move |&pos| pos != (x, y))
    }

    pub fn neighboring_mines(&self, position: Position) -> u8 {
        self.iter_neighbors(position)
            .filter(|pos| self.mines.contains(pos))
            .count() as u8
    }

    pub fn open(&mut self, position: Position) -> Option<OpenResult> {
        if self.open_fields.contains(&position) {
            let mine_count = self.neighboring_mines(position);
            let flag_count = self
                .iter_neighbors(position)
                .filter(|neighbor| self.flagged_fields.contains(neighbor))
                .count() as u8;

            if mine_count == flag_count {
                for neighbor in self.iter_neighbors(position) {
                    if !self.flagged_fields.contains(&neighbor)
                        && !self.open_fields.contains(&neighbor)
                    {
                        self.open(neighbor);
                    }
                }
            }

            return None;
        }

        if self.lost || self.won || self.flagged_fields.contains(&position) {
            return None;
        }

        self.open_fields.insert(position);

        if self.mines.contains(&position) {
            self.lost = true;
            Some(OpenResult::Mine)
        } else {
            let mine_count = self.neighboring_mines(position);
            if mine_count == 0 {
                for neighbor in self.iter_neighbors(position) {
                    if !self.open_fields.contains(&neighbor) {
                        self.open(neighbor);
                    }
                }
            }
            self.won = self.check_win();
            Some(OpenResult::NoMine(0))
        }
    }

    pub fn toggle_flag(&mut self, position: Position) {
        if self.lost || self.won || self.open_fields.contains(&position) {
            return;
        }
        if self.flagged_fields.contains(&position) {
            self.flagged_fields.remove(&position);
        } else {
            self.flagged_fields.insert(position);
        }
    }

    pub fn check_win(&self) -> bool {
        let mut won = true;
        for y in 0..self.height {
            for x in 0..self.width {
                let pos: Position = (x, y);
                if (!self.mines.contains(&pos)) {
                    won = won && self.open_fields.contains(&pos);
                }
            }
        }
        won
    }
}
