let raw_input = Node.Fs.readFileAsUtf8Sync("input/Day2.txt")

let raw_input_array = Js.String.split("\n", raw_input)

Js.Console.log(raw_input_array[0])

type row = {
  range: (int, int),
  m: char,
  password: string
}

let fromStringExn = s => {
  switch Belt.Int.fromString(s) {
  | Some(n) => n
  | None => raise(Failure(s ++ "Int.fromStringExn"))
  }
}

let raw_to_range: (string) => (int, int) = (raw_range)=> {
  // input  ex "1-12"
  // output ex (1, 12)
  switch Js.String.split("-", raw_range)->Js.Array2.map(fromStringExn) {
    | [a, b] => (a, b)
    | _ => raise(Failure("range.fromStringExn"))
  }
}

let raw_to_row = (raw: string) => {
  switch Js.String.split(" ", raw) {
    | [raw_range, raw_m, password] => 
      {
        range: raw_to_range(raw_range),
        m: String.get(raw_m, 0),
        password: password
      }
    | _ => raise(Failure("row.fromStringExn"))
  } 
}


let input_arr: array<row> = raw_input_array -> Js.Array2.map(raw_to_row)

Js.Console.log(input_arr[0])

let count_m: (char, string) => int = (m, password) => {
  Js.String.split("", password)
    ->Js.Array2.map(s => String.get(s, 0))
    ->Js.Array2.filter(c => c == m)
    ->Js.Array.length
}

let first_row = input_arr[0]
Js.Console.log(count_m(first_row.m, first_row.password) == 11)

let validate: (row) => bool = (row_v) => {
  let (from_, to_) = row_v.range
  let count_v = count_m(row_v.m, row_v.password)
  from_ <= count_v && count_v <= to_
}

let validate2: (row) => bool =
  (row_v) => {
    let (a, b) = row_v.range
    let is_m = (v) => (row_v.password -> String.get(v-1) == row_v.m)

    is_m(a) != is_m(b)
  }

Js.Console.log(
  input_arr
  -> Js.Array2.map(validate)
  -> Js.Array2.reduce((acc, v)=>(acc + (v ? 1 : 0)), 0)
)

Js.Console.log(validate2({range: (1,3), m: 'a', password: "abcde"}) == true)
Js.Console.log(validate2({range: (1,3), m: 'b', password: "cdefg"}) == false)
Js.Console.log(validate2({range: (2,9), m: 'c', password: "ccccccccccccc"}) == false)

Js.Console.log(
  input_arr
  -> Js.Array2.map(validate2)
  -> Js.Array2.reduce((acc, v)=>(acc + (v ? 1 : 0)), 0)
)
