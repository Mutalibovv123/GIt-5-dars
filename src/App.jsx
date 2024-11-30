import React, { useState } from "react";

const HomeLoanCalculator = () => {
  const [loanAmount, setLoanAmount] = useState(0);
  const [loanTerm, setLoanTerm] = useState(0);
  const [rateOfInterest, setRateOfInterest] = useState(0);
  const [loanType, setLoanType] = useState("repayment");
  const [calculatedPayment, setCalculatedPayment] = useState(null);
  const [totalPayable, setTotalPayable] = useState(null);

  const calculateLoanRepayment = () => {
    const monthlyRate = rateOfInterest / 100 / 12;
    const totalMonths = loanTerm * 12;
    const monthlyRepayment =
      loanType === "repayment"
        ? (loanAmount * monthlyRate) /
        (1 - Math.pow(1 + monthlyRate, -totalMonths))
        : loanAmount * monthlyRate;

    setCalculatedPayment(monthlyRepayment.toFixed(2));
    setTotalPayable(
      (monthlyRepayment * (loanType === "repayment" ? totalMonths : loanTerm * 12)).toFixed(2)
    );
  };

  const resetDefaults = () => {
    setLoanAmount(300000);
    setLoanTerm(25);
    setRateOfInterest(5.25);
    setLoanType("repayment");
    setCalculatedPayment(null);
    setTotalPayable(null);
  };

  return (<div className="flex justify-center items-center h-screen bg-gray-200">
    <div className="flex bg-white rounded-lg shadow-md overflow-hidden w-4/5 max-w-4xl">
      <div className="p-8 bg-gray-50 w-1/2">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-semibold">Home Loan Calculator</h1>
          <button onClick={resetDefaults} className="text-blue-600 underline">
            Reset
          </button>
        </div>
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700">Loan Amount</label>
          <div className="flex items-center mt-2">
            <span className="mr-2 text-gray-500">£</span>
            <input
              type="number"
              value={loanAmount}
              onChange={(e) => setLoanAmount(+e.target.value)}
              className="flex-1 border border-gray-300 rounded px-2 py-1"
            />
          </div>
        </div>
        <div className="flex mt-4 space-x-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">Loan Term</label>
            <div className="flex items-center mt-2">
              <input
                type="number"
                value={loanTerm}
                onChange={(e) => setLoanTerm(+e.target.value)}
                className="flex-1 border border-gray-300 rounded px-2 py-1"
              />
              <span className="ml-2 text-gray-500">years</span>
            </div>
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">Interest Rate</label>
            <div className="flex items-center mt-2">
              <input
                type="number"
                value={rateOfInterest}
                onChange={(e) => setRateOfInterest(+e.target.value)}
                className="flex-1 border border-gray-300 rounded px-2 py-1"
              />
              <span className="ml-2 text-gray-500">%</span>
            </div>
          </div>
        </div>
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700">Loan Type</label>
          <div className="flex items-center mt-2 space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                value="repayment"
                checked={loanType === "repayment"} onChange={(e) => setLoanType(e.target.value)} className="mr-2"
              />  Repayment </label>  <label className="flex items-center">
              <input type="radio"
                value="interest-only" checked={loanType === "interest-only"} onChange={(e) => setLoanType(e.target.value)}
                className="mr-2"
              />
              Interest-Only
            </label> </div> </div>
        <button onClick={calculateLoanRepayment}
          className="mt-6 w-full bg-yellow-400 text-gray-800 font-semibold py-2 rounded shadow">Calculate Repayment
        </button>
      </div>
      <div className="p-8 w-1/2 bg-gray-800 text-white">
        <h2 className="text-lg font-semibold">Your Results</h2>
        <p className="mt-2 text-sm">Below are the repayment details based on your inputs. Adjust the values and click "Calculate Repayment" to see updated results.
        </p>
        {calculatedPayment && totalPayable && (
          <div className="mt-6">
            <h3 className="text-2xl font-semibold text-yellow-400"> £{calculatedPayment}</h3>
            <p className="mt-2 text-sm">Your Monthly Repayment</p>
            <div className="border-t border-gray-600 mt-4"></div>
            <h3 className="text-lg font-semibold mt-4">£{totalPayable}</h3>
            <p className="mt-2 text-sm">Total Repayment Over the Term</p> </div>
        )}
      </div>
    </div>
  </div>
  );
};

export default HomeLoanCalculator;
