"use client";

import { useState, useCallback } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Lightbulb, Moon, Leaf, CheckCircle2 } from "lucide-react";
import { quizSteps, QuizStep } from "@/data/quizSteps";
import Header from "@/components/Header";
import ProgressBar from "@/components/ProgressBar";
import SingleSelectCard from "@/components/SingleSelectCard";
import MultiSelectCard from "@/components/MultiSelectCard";
import InfoPage from "@/components/InfoPage";
import WaterGlasses from "@/components/WaterGlasses";
import BodyAreaSelector from "@/components/BodyAreaSelector";
import BodyShapeSelector from "@/components/BodyShapeSelector";
import SliderInput from "@/components/SliderInput";
import NumberInputGroup from "@/components/NumberInputGroup";
import ComparisonChart from "@/components/ComparisonChart";
import WeightChart from "@/components/WeightChart";

const infoIcons: Record<string, React.ReactNode> = {
  lightbulb: <Lightbulb className="h-8 w-8" />,
  moon: <Moon className="h-8 w-8" />,
  leaf: <Leaf className="h-8 w-8" />,
};

export default function Home() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, unknown>>({});
  const [direction, setDirection] = useState(1);

  const step = quizSteps[currentStep];
  const isLastStep = currentStep === quizSteps.length - 1;

  const goForward = useCallback(
    (answer?: unknown) => {
      if (answer !== undefined) {
        setAnswers((prev) => ({ ...prev, [step.id]: answer }));
      }
      if (!isLastStep) {
        setDirection(1);
        setCurrentStep((s) => s + 1);
      }
    },
    [step.id, isLastStep]
  );

  const goBack = useCallback(() => {
    if (currentStep > 0) {
      setDirection(-1);
      setCurrentStep((s) => s - 1);
    }
  }, [currentStep]);

  // Progress bar calculations
  const currentSegment = step.segment;
  const stepsInSegment = quizSteps.filter(
    (s) => s.segment === currentSegment
  );
  const indexInSegment = stepsInSegment.indexOf(step);
  const segmentProgress =
    stepsInSegment.length > 1
      ? indexInSegment / (stepsInSegment.length - 1)
      : 0;

  const renderStep = (step: QuizStep) => {
    switch (step.type) {
      case "single-select":
        return (
          <SingleSelectCard
            question={step.question!}
            subtitle={step.subtitle}
            options={step.options!}
            onSelect={(id) => goForward(id)}
          />
        );

      case "multi-select":
        return (
          <MultiSelectCard
            question={step.question!}
            options={step.options!}
            onSubmit={(ids) => goForward(ids)}
          />
        );

      case "info":
        return (
          <InfoPage
            icon={infoIcons[step.infoIcon || "lightbulb"]}
            heading={step.infoHeading!}
            body={
              <div>
                {step.infoBody!.split("\n\n").map((p, i) => (
                  <p key={i} className={i > 0 ? "mt-4" : ""}>
                    {p}
                  </p>
                ))}
                {step.infoBullets && (
                  <div className="mt-4 space-y-2">
                    <p className="font-semibold text-foreground">
                      Some of the benefits you can expect when fasting:
                    </p>
                    {step.infoBullets.map((b, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 shrink-0 text-primary" />
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            }
            buttonLabel={step.infoButtonLabel!}
            onContinue={() => goForward()}
            pinkBg={step.pinkBg}
          />
        );

      case "water-glasses":
        return (
          <WaterGlasses
            question={step.question!}
            onSubmit={(count) => goForward(count)}
          />
        );

      case "body-area":
        return (
          <BodyAreaSelector
            question={step.question!}
            subtitle={step.subtitle}
            areas={step.bodyAreas!}
            onSubmit={(areas) => goForward(areas)}
          />
        );

      case "body-shape":
        return (
          <BodyShapeSelector
            question={step.question!}
            shapes={step.shapes!}
            onSelect={(id) => goForward(id)}
          />
        );

      case "slider":
        return (
          <SliderInput
            question={step.question!}
            labels={step.sliderLabels!}
            onSubmit={(val) => goForward(val)}
          />
        );

      case "number-input":
        return (
          <NumberInputGroup
            question={step.question!}
            subtitle={step.subtitle}
            onSubmit={(data) => goForward(data)}
          />
        );

      case "comparison-chart":
        return (
          <ComparisonChart
            heading={step.question!}
            subtitle={step.subtitle}
            onContinue={() => goForward()}
          />
        );

      case "weight-chart": {
        const weight = (answers["height-weight"] as { weight?: number })
          ?.weight || 100;
        const goalWeight = Math.round(weight * 0.88);
        return (
          <WeightChart
            currentWeight={weight}
            goalWeight={goalWeight}
            goalDate="May 6"
            onContinue={() => goForward()}
          />
        );
      }

      default:
        return <div>Unknown step type</div>;
    }
  };

  return (
    <div
      className={`flex min-h-screen flex-col ${step.pinkBg ? "bg-bg-pink" : "bg-white"}`}
    >
      <Header onBack={goBack} showBack={currentStep > 0} />

      {step.type !== "info" && (
        <ProgressBar
          activeSegment={currentSegment}
          segmentProgress={segmentProgress}
        />
      )}

      <main className="mx-auto flex w-full max-w-[500px] flex-1 flex-col px-6 pb-8">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={step.id}
            initial={{ opacity: 0, x: direction * 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -30 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="flex-1"
          >
            {renderStep(step)}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
