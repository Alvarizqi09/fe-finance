const MarkdownRenderer = ({ text }) => {
  if (!text) return null;

  const cleanText = (content) => {
    if (!content) return "";

    let cleaned = content;

    // Only clean duplicate WORDS, not numbers
    // Use Unicode letter class to match only letters, not digits
    cleaned = cleaned.replace(/\b([A-Za-z\u00C0-\u024F]+)\s+\1\b/gi, "$1");

    // Remove italic markers (single asterisks) but keep bold (**)
    cleaned = cleaned.replace(/(?<!\*)\*(?!\*)([^*]+?)(?<!\*)\*(?!\*)/g, "$1");

    return cleaned.trim();
  };

  // Process inline formatting - ONLY BOLD
  const processInlineFormatting = (text) => {
    const cleanedText = text.trim();
    const parts = [];
    let currentIndex = 0;

    // Parse ONLY bold (**text**)
    const pattern = /\*\*([^*]+?)\*\*/g;
    let match;

    while ((match = pattern.exec(cleanedText)) !== null) {
      // Add text before the match
      if (match.index > currentIndex) {
        const beforeText = cleanedText.slice(currentIndex, match.index);
        if (beforeText) {
          parts.push({
            type: "text",
            content: beforeText,
          });
        }
      }

      // Add bold text
      parts.push({
        type: "bold",
        content: match[1],
      });

      currentIndex = match.index + match[0].length;
    }

    // Add remaining text
    if (currentIndex < cleanedText.length) {
      const remainingText = cleanedText.slice(currentIndex);
      if (remainingText) {
        parts.push({
          type: "text",
          content: remainingText,
        });
      }
    }

    // If no formatting found, return plain text
    if (parts.length === 0) {
      return cleanedText;
    }

    // Render the parts
    return parts.map((part, index) => {
      if (part.type === "bold") {
        return (
          <strong
            key={`bold-${index}`}
            className="font-semibold text-emerald-700"
          >
            {part.content}
          </strong>
        );
      }
      return <span key={`text-${index}`}>{part.content}</span>;
    });
  };

  // Function to split text by bullet points
  const splitByBullets = (content) => {
    const cleanedContent = cleanText(content);

    // Split by bullet markers (• or numbered lists)
    const parts = cleanedContent.split(/(?=•|\n•|\s•|^\d+\.|\n\d+\.)/);

    return parts.map((part) => part.trim()).filter((part) => part.length > 0);
  };

  // Function to safely render markdown
  const renderMarkdown = (content) => {
    if (!content || !content.trim()) {
      return (
        <p className="text-gray-600">
          Maaf, terjadi kesalahan dalam menampilkan respons.
        </p>
      );
    }

    const parts = splitByBullets(content);
    const elements = [];

    parts.forEach((part, index) => {
      const trimmedPart = part.trim();

      if (!trimmedPart) return;

      // Handle bullet points (• or -)
      if (trimmedPart.startsWith("•") || trimmedPart.startsWith("-")) {
        const content = trimmedPart.replace(/^[•-]\s*/, "");
        const processedContent = processInlineFormatting(content);

        elements.push(
          <div key={`bullet-${index}`} className="mb-4">
            <div className="flex items-start gap-2">
              <span className="text-emerald-600 font-bold text-base mt-0.5 flex-shrink-0">
                •
              </span>
              <div className="flex-1 text-sm leading-relaxed text-gray-800">
                {processedContent}
              </div>
            </div>
          </div>
        );
        return;
      }

      // Handle numbered lists
      const numberMatch = trimmedPart.match(/^(\d+)\.\s+(.+)/);
      if (numberMatch) {
        const content = numberMatch[2];
        const processedContent = processInlineFormatting(content);

        elements.push(
          <div key={`number-${index}`} className="mb-4">
            <div className="flex items-start gap-2">
              <span className="text-emerald-600 font-semibold text-sm mt-0.5 flex-shrink-0">
                {numberMatch[1]}.
              </span>
              <div className="flex-1 text-sm leading-relaxed text-gray-800">
                {processedContent}
              </div>
            </div>
          </div>
        );
        return;
      }

      // Regular paragraph (intro text, etc)
      elements.push(
        <p
          key={`p-${index}`}
          className="mb-3 text-sm leading-relaxed text-gray-800"
        >
          {processInlineFormatting(trimmedPart)}
        </p>
      );
    });

    return elements;
  };

  return <div className="markdown-content">{renderMarkdown(text)}</div>;
};

export default MarkdownRenderer;
