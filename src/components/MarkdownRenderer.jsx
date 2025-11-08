// components/MarkdownRenderer.jsx
import React from "react";

const MarkdownRenderer = ({ text }) => {
  if (!text) return null;

  // Ultra-aggressive client-side cleaning
  const cleanText = (content) => {
    if (!content) return "";

    let cleaned = content;

    // Multiple cleaning passes
    for (let i = 0; i < 2; i++) {
      // Fix all the specific duplication patterns we've seen
      cleaned = cleaned.replace(/([A-Za-z\s]+):\s*\1:/g, "$1:");
      cleaned = cleaned.replace(/(Rp\s*[\d.,]+)\s*\1/gi, "$1");
      cleaned = cleaned.replace(/(\b[\w]+\b)\s+\1/gi, "$1");

      // Specific known issues
      cleaned = cleaned.replace(
        /Evaluasi Pengeluaran:\s*Evaluasi Pengeluaran:/g,
        "**Evaluasi Pengeluaran:**"
      );
      cleaned = cleaned.replace(
        /Tingkatkan Pendapatan:\s*Tingkatkan Pendapatan:/g,
        "**Tingkatkan Pendapatan:**"
      );
      cleaned = cleaned.replace(
        /Prioritaskan Pembayaran:\s*Prioritaskan Pembayaran:/g,
        "**Prioritaskan Pembayaran:**"
      );
      cleaned = cleaned.replace(
        /Buat Anggaran:\s*Buat Anggaran:/g,
        "**Buat Anggaran:**"
      );
      cleaned = cleaned.replace(
        /Lacak Pengeluaran:\s*Lacak Pengeluaran:/g,
        "**Lacak Pengeluaran:**"
      );
      cleaned = cleaned.replace(
        /Dana Darurat:\s*Dana Darurat:/g,
        "**Dana Darurat:**"
      );
      cleaned = cleaned.replace(/Investasi:\s*Investasi:/g, "**Investasi:**");

      // Fix amount duplications
      cleaned = cleaned.replace(/Rp\s*89\s*Rp\s*89/g, "**Rp 89**");
      cleaned = cleaned.replace(/Rp\s*233\s*Rp\s*233/g, "**Rp 233**");
      cleaned = cleaned.replace(/Rp\s*144\s*Rp\s*144/g, "**Rp 144**");
    }

    return cleaned.replace(/\s+/g, " ").trim();
  };

  // Function to safely render markdown
  const renderMarkdown = (content) => {
    const cleanedContent = cleanText(content);

    // If content is empty after cleaning, show fallback
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
      // Skip empty lines
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

      // Close list if active and new non-list line
      closeList();

      // Regular paragraph with formatting
      elements.push(
        <p key={`p-${index}`} className="mb-3 leading-relaxed">
          {processInlineFormatting(trimmedLine)}
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

  return (
    <div className="markdown-content text-sm leading-relaxed">
      {renderMarkdown(text)}
    </div>
  );
};

export default MarkdownRenderer;
