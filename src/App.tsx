import { useState } from "react";
import { questionMaster, serviceMaster } from "./master";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

type Inputs = {
  animal: string;
  building: string;
  floorSpace: string;
  service: string[];
};

function App() {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      service: [],
    },
  });
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data.service);
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
          <div className="flex">
            <span className="text-lg font-bold">
              {value.questionNum + ". "}
            </span>
            <span className="text-lg font-bold">{value.question}</span>
          </div>
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
          {errors.animal && value.inputValue === "animal" && (
            <span className="text-sm text-red-600 pl-2 pt-1">
              ※ 駆除を依頼したい害獣の種類を入力してください
            </span>
          )}
          {errors.building && value.inputValue === "building" && (
            <span className="text-sm text-red-600 pl-2 pt-1">
              ※ 被害を受けている建物の種類を入力してください
            </span>
          )}
          {errors.floorSpace && value.inputValue === "floorSpace" && (
            <span className="text-sm text-red-600 pl-2 pt-1">
              ※ 建物の床面積を入力してください
            </span>
          )}
        </div>
      );
    } else {
      return (
        <div key={value.questionNum}>
          <div className="flex">
            <span className="text-lg font-bold">
              {value.questionNum + ". "}
            </span>
            <span className="text-lg font-bold">{value.question}</span>
          </div>
          <div className="flex justify-center pb-2">
            <Controller
              name="service"
              control={control}
              rules={{
                validate: (value: string[]) => value.length > 0,
              }}
              render={({ field }) => (
                <div className="grid gap-4 grid-cols-3 mt-2 px-2">
                  {value.choices.map((choice, index) => {
                    const isSelected = field.value.includes(choice);
                    return (
                      <label key={index}>
                        <img
                          src={"./public/assets/service" + (index + 1) + ".jpg"}
                          alt={"service" + (index + 1)}
                          onClick={() => {
                            const newValue = isSelected
                              ? field.value.filter((v: string) => v !== choice)
                              : [...field.value, choice];
                            field.onChange(newValue);
                          }}
                          className={`w-28 h-20 object-contain rounded-lg cursor-pointer transition ${
                            isSelected
                              ? "ring-4 ring-blue-500"
                              : "ring-2 ring-gray-300 hover:ring-blue-300"
                          }`}
                        />
                      </label>
                    );
                  })}
                </div>
              )}
            />
          </div>
          {errors.service && (
            <span className="text-sm text-red-600 pl-2">
              ※ 希望するサービスを入力してください
            </span>
          )}
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
              {totalCost !== 0 ? totalCost.toLocaleString("ja-JP") : ""}
            </div>
            円
          </div>
          <span className="text-xs">
            ※ 実際のご請求額とお見積り金額が異なる場合がございます
            <br />※
            あくまでもシミュレーション上の金額ですので、参考金額としてお考えください
          </span>
        </div>
      </form>
    </div>
  );
}

export default App;
