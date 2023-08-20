import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useState, useEffect } from "react";

function chart() {
  //   random data
  const randdata = [
    Math.floor(Math.random() * 10000),
    Math.floor(Math.random() * 10000),
    Math.floor(Math.random() * 10000),
    Math.floor(Math.random() * 10000),
    Math.floor(Math.random() * 10000),
    Math.floor(Math.random() * 10000),
    Math.floor(Math.random() * 10000),
    Math.floor(Math.random() * 10000),
  ];

  const data = [
    {
      name: "Jan",
      user: randdata[0],
      guest: randdata[1],
    },
    {
      name: "Feb",
      user: randdata[2],
      guest: randdata[3],
    },
    {
      name: "Mar",
      user: randdata[4],
      guest: randdata[5],
    },
    {
      name: "Apr",
      user: randdata[6],
      guest: randdata[7],
    },
  ];

  return (
    <>
      <div>
        <div className="text-lg font-bold py-2">Monthly SuperTokens Spent:</div>
        <div className="pt-4">
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={data}>
              <CartesianGrid strokeLinearray="3 3" vertical={false} />
              <XAxis dataKey="name" tickLine={false} tickMargin={10} />
              <YAxis tickCount={5} tickLine={false} tickMargin={10} />

              <Line
                type="monotone"
                dataKey="guest"
                stroke="#E9A0A0"
                strokeWidth={2}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
}

export default chart;
