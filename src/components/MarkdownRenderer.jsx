// components/MarkdownRenderer.jsx
import React from "react";

const MarkdownRenderer = ({ text }) => {
  if (!text) return null;

  // Clean text function
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

    // Remove italic markers (single asterisks)
    cleaned = cleaned.replace(/(?<!\*)\*(?!\*)([^*]+?)(?<!\*)\*(?!\*)/g, "$1");

    // Clean up multiple spaces
    cleaned = cleaned.replace(/\s+/g, " ");

    return cleaned.trim();
  };

  // Process inline formatting - ONLY BOLD
  const processInlineFormatting = (text) => {
    const cleanedText = cleanText(text);
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

    // Split by newlines and process
    const lines = cleanedContent.split("\n");
    const elements = [];

    lines.forEach((line, index) => {
      const trimmedLine = line.trim();

      // Skip empty lines
      if (trimmedLine === "") {
        return;
      }

      // Handle bullet points (• or -)
      if (trimmedLine.startsWith("•") || trimmedLine.startsWith("-")) {
        const content = trimmedLine.replace(/^[•-]\s*/, "");
        const processedContent = processInlineFormatting(content);

        elements.push(
          <div key={`bullet-${index}`} className="mb-4">
            <div className="flex items-start gap-2">
              <span className="text-emerald-600 font-bold text-base mt-0.5 flex-shrink-0">
                •
              </span>
              <div className="flex-1 text-sm leading-relaxed">
                {processedContent}
              </div>
            </div>
          </div>
        );
        return;
      }

      // Handle numbered lists
      if (/^\d+\.\s/.test(trimmedLine)) {
        const content = trimmedLine.replace(/^\d+\.\s*/, "");
        const processedContent = processInlineFormatting(content);

        elements.push(
          <div key={`number-${index}`} className="mb-4 ml-5">
            <div className="text-sm leading-relaxed">{processedContent}</div>
          </div>
        );
        return;
      }

      // Regular paragraph
      elements.push(
        <p key={`p-${index}`} className="mb-4 text-sm leading-relaxed">
          {processInlineFormatting(trimmedLine)}
        </p>
      );
    });

    return elements;
  };

  return (
    <div className="markdown-content text-gray-800">{renderMarkdown(text)}</div>
  );
};

export default MarkdownRenderer;
