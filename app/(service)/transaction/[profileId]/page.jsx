"use client"

import TransactionTable from "@/components/transaction-table";
import { getTransaction } from "@/rest/transaction";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Transaction({params}) {
  const router = useRouter();
  const [transactionList, setTransactionList] = useState([]);

  const fetchTransactionData = async () => {
    try {
      const transactions = await getTransaction(params.profileId);

      if (transactions?.data) {
        setTransactionList(transactions.data);
      } else {
        router.push("/404");
      }
    } catch (error) {
      console.error("Error fetching transactions:", error);
      router.push("/404");
    }
  };

  useEffect(() => {
    fetchTransactionData();
  }, [params.profileId, router]);

  return (
    <div className="m-16 relative rounded-md border">
      <TransactionTable transactionList={transactionList} />
    </div>
  );
  }