import React, { useState, useEffect } from "react";
import FailedContributionAlert from "./FailedContributionAlert";

const FailedContributionsNotifier = ({ goals }) => {
  const [failedContributions, setFailedContributions] = useState([]);
  const [dismissedIds, setDismissedIds] = useState(
    JSON.parse(localStorage.getItem("dismissedFailedContributions")) || []
  );

  useEffect(() => {
    // Extract failed contributions dari semua goals
    const failed = [];

    goals.forEach((goal) => {
      if (goal.contributions && goal.contributions.length > 0) {
        const failedAttempts = goal.contributions.filter(
          (c) => c.type === "auto" && c.amount === 0
        );

        failedAttempts.forEach((attempt) => {
          const id = `${goal._id}-${attempt.date}`;
          if (!dismissedIds.includes(id)) {
            failed.push({
              ...attempt,
              goalId: goal._id,
              goalName: goal.goalName,
              id,
            });
          }
        });
      }
    });

    setFailedContributions(failed);
  }, [goals, dismissedIds]);

  const handleDismiss = (id) => {
    setDismissedIds([...dismissedIds, id]);
    localStorage.setItem(
      "dismissedFailedContributions",
      JSON.stringify([...dismissedIds, id])
    );
    setFailedContributions(failedContributions.filter((c) => c.id !== id));
  };

  if (failedContributions.length === 0) {
    return null;
  }

  return (
    <div className="mb-6">
      {failedContributions.map((contribution) => (
        <FailedContributionAlert
          key={contribution.id}
          contribution={contribution}
          onDismiss={() => handleDismiss(contribution.id)}
        />
      ))}
    </div>
  );
};

export default FailedContributionsNotifier;
