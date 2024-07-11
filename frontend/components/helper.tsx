export function renderTextWithLineBreaks(text) {
  return text.split("\n").map((item, index) => (
    <span key={index}>
      {item}
      <br />
    </span>
  ));
}
