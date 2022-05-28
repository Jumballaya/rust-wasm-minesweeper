mod minesweeper;
mod random;

use minesweeper::*;
use std::{borrow::Borrow, cell::RefCell};
use wasm_bindgen::prelude::*;

thread_local! {
    static MINESWEEPER: RefCell<Minesweeper> = RefCell::new(Minesweeper::new(10, 10, 5));
}

#[wasm_bindgen(js_name = "newGame")]
pub fn new_game(w: usize, h: usize, mc: usize) {
    MINESWEEPER.with(|ms| {
        ms.replace_with(|ms| Minesweeper::new(w, h, mc));
    });
}

#[wasm_bindgen(js_name = "getState")]
pub fn get_state() -> String {
    MINESWEEPER.with(|ms| ms.borrow().to_string())
}

#[wasm_bindgen(js_name = "openField")]
pub fn open_field(x: usize, y: usize) {
    MINESWEEPER.with(|ms| {
        ms.borrow_mut().open((x, y));
    });
}

#[wasm_bindgen(js_name = "flagField")]
pub fn flag_field(x: usize, y: usize) {
    MINESWEEPER.with(|ms| {
        ms.borrow_mut().toggle_flag((x, y));
    });
}

#[wasm_bindgen(js_name = "checkWin")]
pub fn check_win() -> bool {
    MINESWEEPER.with(|ms| ms.borrow().won)
}

#[wasm_bindgen(js_name = "checkLost")]
pub fn check_lost() -> bool {
    MINESWEEPER.with(|ms| ms.borrow().lost)
}
