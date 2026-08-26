import { forwardRef } from "react";
import type { ComponentPropsWithoutRef } from "react";
import { Button } from "@digdir/designsystemet-react";

import "./FeedbackWidget.css";

export interface DibkFeedbackWidgetProps extends ComponentPropsWithoutRef<"div"> {
  /** Defaults to "Fant du det du lette etter?". */
  question?: string;
  onAnswer?: (answer: "ja" | "nei") => void;
}

export const DibkFeedbackWidget = forwardRef<HTMLDivElement, DibkFeedbackWidgetProps>(
  function DibkFeedbackWidget(
    { question = "Fant du det du lette etter?", onAnswer, className, ...rest },
    ref,
  ) {
    return (
      <div
        {...rest}
        ref={ref}
        className={["dibk-feedback", className].filter(Boolean).join(" ")}
        data-dibk-feedback
      >
        <p className="dibk-feedback__question">{question}</p>
        <div className="dibk-feedback__actions">
          <Button variant="primary" className="dibk-feedback__btn" onClick={() => onAnswer?.("ja")}>
            Ja
          </Button>
          <Button variant="secondary" className="dibk-feedback__btn" onClick={() => onAnswer?.("nei")}>
            Nei
          </Button>
        </div>
      </div>
    );
  },
);
