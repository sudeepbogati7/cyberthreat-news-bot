"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { AlertTriangle, ArrowUpRight, Shield, Skull, WormIcon as Virus } from 'lucide-react'

const threatData = [
  {
    id: 1,
    name: "Ransomware Attack",
    type: "Ransomware",
    severity: "Critical",
    target: "Healthcare",
    date: "2025-05-15",
    status: "Active",
    icon: Skull,
  },
  {
    id: 2,
    name: "Zero-day Vulnerability",
    type: "Vulnerability",
    severity: "High",
    target: "Financial",
    date: "2025-05-14",
    status: "Active",
    icon: AlertTriangle,
  },
  {
    id: 3,
    name: "Phishing Campaign",
    type: "Phishing",
    severity: "Medium",
    target: "Education",
    date: "2025-05-12",
    status: "Active",
    icon: Virus,
  },
  {
    id: 4,
    name: "DDoS Attack",
    type: "DDoS",
    severity: "Medium",
    target: "E-commerce",
    date: "2025-05-10",
    status: "Mitigated",
    icon: AlertTriangle,
  },
  {
    id: 5,
    name: "Data Breach",
    type: "Data Breach",
    severity: "High",
    target: "Retail",
    date: "2025-05-08",
    status: "Mitigated",
    icon: Skull,
  },
]

export function RecentThreats() {
  const [threats] = useState(threatData)

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Severity</TableHead>
          <TableHead>Target</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {threats.map((threat) => (
          <TableRow key={threat.id}>
            <TableCell className="font-medium">
              <div className="flex items-center">
                <threat.icon className="h-4 w-4 mr-2 text-red-500" />
                {threat.name}
              </div>
            </TableCell>
            <TableCell>{threat.type}</TableCell>
            <TableCell>
              <Badge
                variant="outline"
                className={
                  threat.severity === "Critical"
                    ? "border-red-500 text-red-500"
                    : threat.severity === "High"
                    ? "border-orange-500 text-orange-500"
                    : "border-yellow-500 text-yellow-500"
                }
              >
                {threat.severity}
              </Badge>
            </TableCell>
            <TableCell>{threat.target}</TableCell>
            <TableCell>{new Date(threat.date).toLocaleDateString()}</TableCell>
            <TableCell>
              <Badge
                variant="outline"
                className={
                  threat.status === "Active"
                    ? "border-red-500 bg-red-500/10 text-red-500"
                    : "border-green-500 bg-green-500/10 text-green-500"
                }
              >
                {threat.status === "Active" ? (
                  <AlertTriangle className="h-3 w-3 mr-1" />
                ) : (
                  <Shield className="h-3 w-3 mr-1" />
                )}
                {threat.status}
              </Badge>
            </TableCell>
            <TableCell className="text-right">
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <ArrowUpRight className="h-4 w-4" />
                <span className="sr-only">View details</span>
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
