import { useState } from "react";
import { questionMaster, serviceMaster } from "./master";
import { SubmitHandler, useForm } from "react-hook-form";

type Inputs = {
  animal: string;
  building: string;
  floorSpace: string;
  service: string[];
};

function App() {
  const { register, handleSubmit } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    let cost = 0;
    data.service.forEach((value) => {
      const service = serviceMaster.find((service) => service.name === value)!;
      const price =
        service.prices.find((item) => item.type === data.floorSpace)?.price ??
        0;
      cost += price;
    });
    setTotalCost(cost);
  };

  const [totalCost, setTotalCost] = useState(0);

  const questionList = questionMaster.map((value) => {
    if (value.isRadioButton) {
      return (
        <div key={value.questionNum}>
          <p className="text-lg font-bold">
            {value.questionNum + ". " + value.question}
          </p>
          <div className="flex flex-col mt-1 px-2">
            {value.choices.map((choice, index) => {
              return (
                <label key={index}>
                  <input
                    className="mr-2"
                    type="radio"
                    value={choice}
                    {...register(value.inputValue, { required: true })}
                  />
                  {choice}
                </label>
              );
            })}
          </div>
        </div>
      );
    } else {
      return (
        <div key={value.questionNum}>
          <p className="text-lg font-bold">
            {value.questionNum + ". " + value.question}
          </p>
          <div className="flex flex-col mt-1 px-2">
            {value.choices.map((choice, index) => {
              return (
                <label key={index}>
                  <input
                    className="mr-2"
                    type="checkbox"
                    value={choice}
                    {...register(value.inputValue)}
                  />
                  {choice}
                </label>
              );
            })}
          </div>
        </div>
      );
    }
  });

  return (
    <div className="w-screen flex flex-col items-center justify-center px-4 py-5">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1 className="flex justify-center text-2xl font-bold text-orange-500">
          1分で簡単お見積もり
          <br className="lg:hidden" />
          シミュレーション
        </h1>
        <div className="w-full flex flex-col gap-3 mt-3 px-6 py-3 border-4 rounded-lg border-orange-500">
          {questionList}
          <div className="flex justify-center my-4">
            <button
              className="border-2 rounded-lg text-white bg-blue-600 font-semibold py-2 px-7"
              type="submit"
            >
              お見積り額を計算
            </button>
          </div>
          <div className="font-semibold">お見積り額 合計</div>
          <div className="w-full border-b-2 flex items-end justify-end">
            <div className="mr-2 text-3xl font-semibold">
              {totalCost !== 0 ? totalCost : ""}
            </div>
            円
          </div>
        </div>
      </form>
    </div>
  );
}

export default App;
