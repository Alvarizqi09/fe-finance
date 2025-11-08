// components/MarkdownRenderer.jsx
import React from "react";

const MarkdownRenderer = ({ text }) => {
  if (!text) return null;

  // Additional client-side cleaning as fallback
  const cleanText = (content) => {
    return content
      .replace(/([A-Za-z\s]+):\1:/g, "$1:")
      .replace(/(Rp\s*\d+)\s*\1/gi, "$1")
      .replace(/\b(\w+)\s+\1\b/gi, "$1");
  };

  // Function to safely render markdown
  const renderMarkdown = (content) => {
    const cleanedContent = cleanText(content);
    const lines = cleanedContent.split("\n");
    const elements = [];

    let currentList = null;
    let listItems = [];
    let listType = null;

    const closeList = () => {
      if (currentList !== null && listItems.length > 0) {
        if (listType === "ul") {
          elements.push(
            <ul
              key={`ul-${currentList}`}
              className="list-disc list-inside space-y-1 ml-4"
            >
              {listItems}
            </ul>
          );
        } else if (listType === "ol") {
          elements.push(
            <ol
              key={`ol-${currentList}`}
              className="list-decimal list-inside space-y-1 ml-4"
            >
              {listItems}
            </ol>
          );
        }
        listItems = [];
        currentList = null;
        listType = null;
      }
    };

    lines.forEach((line, index) => {
      // Skip empty lines
      if (line.trim() === "") {
        closeList();
        elements.push(<br key={`br-${index}`} />);
        return;
      }

      // Handle bullet points
      if (line.trim().startsWith("•") || line.trim().startsWith("-")) {
        if (currentList === null || listType !== "ul") {
          closeList();
          currentList = index;
          listType = "ul";
        }
        const listItem = processInlineFormatting(line.replace(/^[•-]\s*/, ""));
        listItems.push(<li key={`li-${index}`}>{listItem}</li>);
        return;
      }

      // Handle numbered lists
      if (/^\d+\.\s/.test(line.trim())) {
        if (currentList === null || listType !== "ol") {
          closeList();
          currentList = index;
          listType = "ol";
        }
        const listItem = processInlineFormatting(line.replace(/^\d+\.\s*/, ""));
        listItems.push(<li key={`li-${index}`}>{listItem}</li>);
        return;
      }

      // Close list if active and new non-list line
      closeList();

      // Regular paragraph with formatting
      elements.push(
        <p key={`p-${index}`} className="mb-2">
          {processInlineFormatting(line)}
        </p>
      );
    });

    // Close any open list at the end
    closeList();

    return elements;
  };

  // Process inline formatting (bold, italic)
  const processInlineFormatting = (text) => {
    const elements = [];
    const boldRegex = /\*\*(.*?)\*\*/g;
    const italicRegex = /\*(.*?)\*/g;

    let match;
    const boldMatches = [];
    const italicMatches = [];

    // Clean the text first
    const cleanedText = cleanText(text);

    // Collect all bold matches
    while ((match = boldRegex.exec(cleanedText)) !== null) {
      boldMatches.push({
        type: "bold",
        start: match.index,
        end: match.index + match[0].length,
        content: match[1],
      });
    }

    // Collect all italic matches
    while ((match = italicRegex.exec(cleanedText)) !== null) {
      italicMatches.push({
        type: "italic",
        start: match.index,
        end: match.index + match[0].length,
        content: match[1],
      });
    }

    // Combine and sort all matches
    const allMatches = [...boldMatches, ...italicMatches].sort(
      (a, b) => a.start - b.start
    );

    // Build elements array
    let lastIndex = 0;

    allMatches.forEach((match, index) => {
      // Add text before match
      if (match.start > lastIndex) {
        elements.push(cleanedText.slice(lastIndex, match.start));
      }

      // Add formatted element
      if (match.type === "bold") {
        elements.push(
          <strong
            key={`bold-${index}`}
            className="font-semibold text-emerald-700"
          >
            {match.content}
          </strong>
        );
      } else {
        elements.push(
          <em key={`italic-${index}`} className="italic text-gray-600">
            {match.content}
          </em>
        );
      }

      lastIndex = match.end;
    });

    // Add remaining text
    if (lastIndex < cleanedText.length) {
      elements.push(cleanedText.slice(lastIndex));
    }

    // If no matches, return original cleaned text
    if (elements.length === 0) {
      return cleanedText;
    }

    return elements;
  };

  return <div className="markdown-content">{renderMarkdown(text)}</div>;
};

export default MarkdownRenderer;
