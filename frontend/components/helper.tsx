export function renderTextWithLineBreaks(text: string) {
  return text.split("\n").map((item, index) => (
    <span key={index}>
      {item}
      <br />
    </span>
  ));
}
