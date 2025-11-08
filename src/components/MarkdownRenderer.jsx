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

  // Process inline formatting - ONLY BOLD (no italic)
  const processInlineFormatting = (text) => {
    const cleanedText = cleanText(text);
    const parts = [];
    let currentIndex = 0;

    // Parse ONLY bold (**text**)
    const pattern = /\*\*([^*]+)\*\*/g;
    let match;

    while ((match = pattern.exec(cleanedText)) !== null) {
      // Add text before the match
      if (match.index > currentIndex) {
        parts.push({
          type: "text",
          content: cleanedText.slice(currentIndex, match.index),
        });
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
      return part.content;
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
            <ul key={`ul-${currentList}`} className="space-y-3 mb-4">
              {listItems}
            </ul>
          );
        } else if (listType === "ol") {
          elements.push(
            <ol key={`ol-${currentList}`} className="space-y-3 mb-4">
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
          <li key={`li-${index}`} className="mb-3 leading-relaxed">
            <span className="inline-block">
              <span className="text-emerald-600 font-bold mr-2">•</span>
              {listItem}
            </span>
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
          <li key={`li-${index}`} className="mb-3 leading-relaxed ml-5">
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
    <div className="markdown-content text-sm leading-relaxed text-gray-800">
      {renderMarkdown(text)}
    </div>
  );
};

export default MarkdownRenderer;
