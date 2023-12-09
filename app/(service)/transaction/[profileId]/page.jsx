"use client"

import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell, TableCaption } from "@/components/ui/table";
import { getTransaction } from "@/rest/transaction";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Transaction({params}) {
    const router = useRouter();
    const [transactionList, setTransactionList] = useState([]);
    useEffect(() => {
        const fetchTransaction = async () => {
          const transactions = await getTransaction(params.profileId);
    
          if (transactions.data) {
            setTransactionList(transactions.data);
          } else {
            router.push("/404");
          }
        };
    
        fetchTransaction();
      }, []);

    return (
        <div className="m-16 relative rounded-md border">
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
              {console.log(transaction)}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </div>
    );
  }