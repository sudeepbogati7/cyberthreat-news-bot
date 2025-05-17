"use client"

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  {
    name: "Jan",
    Ransomware: 40,
    Phishing: 24,
    Malware: 35,
  },
  {
    name: "Feb",
    Ransomware: 30,
    Phishing: 28,
    Malware: 32,
  },
  {
    name: "Mar",
    Ransomware: 45,
    Phishing: 26,
    Malware: 38,
  },
  {
    name: "Apr",
    Ransomware: 50,
    Phishing: 32,
    Malware: 42,
  },
  {
    name: "May",
    Ransomware: 35,
    Phishing: 40,
    Malware: 30,
  },
  {
    name: "Jun",
    Ransomware: 55,
    Phishing: 36,
    Malware: 45,
  },
  {
    name: "Jul",
    Ransomware: 48,
    Phishing: 42,
    Malware: 52,
  },
  {
    name: "Aug",
    Ransomware: 60,
    Phishing: 45,
    Malware: 55,
  },
  {
    name: "Sep",
    Ransomware: 70,
    Phishing: 50,
    Malware: 60,
  },
  {
    name: "Oct",
    Ransomware: 65,
    Phishing: 55,
    Malware: 58,
  },
  {
    name: "Nov",
    Ransomware: 75,
    Phishing: 58,
    Malware: 62,
  },
  {
    name: "Dec",
    Ransomware: 85,
    Phishing: 60,
    Malware: 70,
  },
]

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}`}
        />
        <Tooltip />
        <Bar dataKey="Ransomware" fill="#ef4444" radius={[4, 4, 0, 0]} />
        <Bar dataKey="Phishing" fill="#f97316" radius={[4, 4, 0, 0]} />
        <Bar dataKey="Malware" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
