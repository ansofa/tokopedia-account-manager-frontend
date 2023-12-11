import React from "react";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";

export default function TransactionTable({ transactionList }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Tanggal</TableHead>
          <TableHead>Produk</TableHead>
          <TableHead>Total Harga</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactionList.map((transaction) => (
          <TableRow key={transaction.orderUUID}>
            <TableCell>{transaction.transactionDate}</TableCell>
            <TableCell className="font-medium">{transaction.productName}</TableCell>
            <TableCell className="font-bold">{transaction.totalPrice}</TableCell>
            <TableCell className={`text-[${transaction.status.textColor}]`}>{transaction.status.label}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};