const line = '|'
const step = '---'
const blank = '   '

export function generateTable(columns: number, rows: number = 2) {
  const cols = columns + 1
  let head = ''
  head += Array(cols).fill(line).join(blank) + '\n'
  head += Array(cols).fill(line).join(step) + '\n'
  head += Array(rows).fill(Array(cols).fill(line).join(blank)).join('\n')
  return head
}
