// components/MarkdownRenderer.jsx
import React from "react";

const MarkdownRenderer = ({ text }) => {
  if (!text) return null;

  // Ultra-aggressive client-side cleaning
  const cleanText = (content) => {
    if (!content) return "";

    let cleaned = content;

    // Multiple cleaning passes
    for (let i = 0; i < 3; i++) {
      // Fix duplicate phrases with colon
      cleaned = cleaned.replace(/([A-Za-z\u00C0-\u024F\s]+):\s*\1:/g, "$1:");

      // Fix duplicate Rupiah amounts
      cleaned = cleaned.replace(/(Rp\s*[\d.,]+)\s*Rp\s*[\d.,]+/gi, "$1");

      // Fix duplicate words
      cleaned = cleaned.replace(/(\b[\w\u00C0-\u024F]+\b)\s+\1\b/gi, "$1");

      // Fix duplicate numbers
      cleaned = cleaned.replace(/(\d+)\s*\1\b/g, "$1");
    }

    return cleaned.replace(/\s+/g, " ").trim();
  };

  // Process inline formatting WITHOUT duplication
  const processInlineFormatting = (text) => {
    const cleanedText = cleanText(text);
    const parts = [];
    let currentIndex = 0;

    // Parse bold (**text**) and italic (*text*) in one pass
    const pattern = /(\*\*([^*]+)\*\*)|(\*([^*]+)\*)/g;
    let match;

    while ((match = pattern.exec(cleanedText)) !== null) {
      // Add text before the match
      if (match.index > currentIndex) {
        parts.push({
          type: "text",
          content: cleanedText.slice(currentIndex, match.index),
        });
      }

      // Add the formatted text
      if (match[1]) {
        // Bold match
        parts.push({
          type: "bold",
          content: match[2],
        });
      } else if (match[3]) {
        // Italic match
        parts.push({
          type: "italic",
          content: match[4],
        });
      }

      currentIndex = match.index + match[0].length;
    }

    // Add remaining text
    if (currentIndex < cleanedText.length) {
      parts.push({
        type: "text",
        content: cleanedText.slice(currentIndex),
      });
    }

    // If no formatting found, return plain text
    if (parts.length === 0) {
      return cleanedText;
    }

    // Render the parts
    return parts.map((part, index) => {
      switch (part.type) {
        case "bold":
          return (
            <strong
              key={`bold-${index}`}
              className="font-semibold text-emerald-700"
            >
              {part.content}
            </strong>
          );
        case "italic":
          return (
            <em key={`italic-${index}`} className="italic text-gray-600">
              {part.content}
            </em>
          );
        case "text":
        default:
          return part.content;
      }
    });
  };

  // Function to safely render markdown
  const renderMarkdown = (content) => {
    const cleanedContent = cleanText(content);

    if (!cleanedContent.trim()) {
      return (
        <p className="text-gray-600">
          Maaf, terjadi kesalahan dalam menampilkan respons.
        </p>
      );
    }

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
              className="list-disc list-inside space-y-2 ml-4 mb-2"
            >
              {listItems}
            </ul>
          );
        } else if (listType === "ol") {
          elements.push(
            <ol
              key={`ol-${currentList}`}
              className="list-decimal list-inside space-y-2 ml-4 mb-2"
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
      const trimmedLine = line.trim();
      if (trimmedLine === "") {
        closeList();
        return;
      }

      // Handle bullet points
      if (trimmedLine.startsWith("•") || trimmedLine.startsWith("-")) {
        if (currentList === null || listType !== "ul") {
          closeList();
          currentList = index;
          listType = "ul";
        }
        const listItem = processInlineFormatting(
          trimmedLine.replace(/^[•-]\s*/, "")
        );
        listItems.push(
          <li key={`li-${index}`} className="mb-1">
            {listItem}
          </li>
        );
        return;
      }

      // Handle numbered lists
      if (/^\d+\.\s/.test(trimmedLine)) {
        if (currentList === null || listType !== "ol") {
          closeList();
          currentList = index;
          listType = "ol";
        }
        const listItem = processInlineFormatting(
          trimmedLine.replace(/^\d+\.\s*/, "")
        );
        listItems.push(
          <li key={`li-${index}`} className="mb-1">
            {listItem}
          </li>
        );
        return;
      }

      closeList();

      // Regular paragraph
      elements.push(
        <p key={`p-${index}`} className="mb-3 leading-relaxed">
          {processInlineFormatting(trimmedLine)}
        </p>
      );
    });

    closeList();

    return elements;
  };

  return (
    <div className="markdown-content text-sm leading-relaxed">
      {renderMarkdown(text)}
    </div>
  );
};

export default MarkdownRenderer;
