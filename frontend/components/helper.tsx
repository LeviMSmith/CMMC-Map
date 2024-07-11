export function renderTextWithLineBreaks(text: string) {
  // Split text on newlines that are followed by a capital letter, no letter, or a non-bracket character
  const parts = text.split(/(?<=\n)(?=[A-Z])|(?<=\n)(?=\s*[^a-zA-Z\(\[\{\<])/);

  return parts.map((item, index) => (
    <span key={index}>
      {item.trim()}
      {index < parts.length - 1 && (
        <>
          <br />
          <br />
        </>
      )}
    </span>
  ));
}
