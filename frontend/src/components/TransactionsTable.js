// import React, { useEffect, useState } from "react";
// import { fetchTransactions } from "../services/api";
// import { FaChevronDown } from "react-icons/fa"; // For dropdown arrow

// const TransactionsTable = () => {
//   const [transactions, setTransactions] = useState([]);
//   const [search, setSearch] = useState("");
//   const [page, setPage] = useState(1);
//   const [month, setMonth] = useState(11); // Default: November
//   const [year, setYear] = useState(2021);
//   const perPage = 10;

//   useEffect(() => {
//     const loadTransactions = async () => {
//       try {
//         const data = await fetchTransactions(month, year, search, page, perPage);
//         console.log("📌 API Response:", data); // Debugging: Check API response
//         if (data && data.transactions) {
//           setTransactions(data.transactions);
//         } else {
//           setTransactions([]); // Ensure state is updated
//         }
//       } catch (error) {
//         console.error("❌ API Fetch Error:", error);
//       }
//     };
//     loadTransactions();
//   }, [month, year, search, page]);
  
//   return (
//     <div className="bg-[#E6F0F2] min-h-screen flex flex-col items-center py-10">
//       {/* Title */}
//       <h2 className="bg-white px-6 py-3 text-xl font-semibold rounded-full shadow-md">
//         Transaction Dashboard
//       </h2>

//       {/* Dropdowns for selecting month & year */}
//       <div className="flex justify-center gap-4 my-6">
//         <select
//           className="p-2 border rounded-md bg-white shadow-sm"
//           value={month}
//           onChange={(e) => setMonth(parseInt(e.target.value))}
//         >
//           {[...Array(12)].map((_, i) => (
//             <option key={i + 1} value={i + 1}>
//               {new Date(0, i).toLocaleString("default", { month: "long" })}
//             </option>
//           ))}
//         </select>

//         <select
//           className="p-2 border rounded-md bg-white shadow-sm"
//           value={year}
//           onChange={(e) => setYear(parseInt(e.target.value))}
//         >
//           {[2020, 2021, 2022].map((yr) => (
//             <option key={yr} value={yr}>
//               {yr}
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* Search Bar */}
//       <div className="flex justify-center gap-6 mb-6">
//         <input
//           type="text"
//           placeholder="Search transaction"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className="p-2 border rounded-md bg-white shadow-sm w-64"
//         />
//       </div>

//       {/* Transactions Table */}
//       <div className="mt-8 w-full max-w-5xl">
//         <table className="w-full border-collapse border border-black text-center">
//           {/* Table Head */}
//           <thead>
//             <tr className="bg-[#F2C94C] text-black font-semibold">
//               <th className="border border-black px-3 py-2">ID</th>
//               <th className="border border-black px-3 py-2">Title</th>
//               <th className="border border-black px-3 py-2">Description</th>
//               <th className="border border-black px-3 py-2">Price</th>
//               <th className="border border-black px-3 py-2">Category</th>
//               <th className="border border-black px-3 py-2">Sold</th>
//               <th className="border border-black px-3 py-2">Image</th>
//             </tr>
//           </thead>

//           {/* Table Body */}
//           <tbody>
//             {transactions.length > 0 ? (
//               transactions.map((txn) => (
//                 <tr key={txn.id} className="border border-black">
//                   <td className="border border-black px-3 py-2">{txn.id}</td>
//                   <td className="border border-black px-3 py-2">{txn.title}</td>
//                   <td className="border border-black px-3 py-2">
//                     {txn.description}
//                   </td>
//                   <td className="border border-black px-3 py-2">
//                     ${txn.price}
//                   </td>
//                   <td className="border border-black px-3 py-2">
//                     {txn.category}
//                   </td>
//                   <td className="border border-black px-3 py-2">
//                     {txn.sold ? "✅ Yes" : "❌ No"}
//                   </td>
//                   <td className="border border-black px-3 py-2">
//                     <img
//                       src={txn.image || "https://via.placeholder.com/150"}
//                       alt={txn.title}
//                       className="w-16 h-16 object-cover rounded"
//                     />
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td
//                   colSpan="7"
//                   className="border border-black py-4 text-gray-500"
//                 >
//                   No transactions found.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* Pagination */}
//       <div className="mt-4 flex justify-between w-full max-w-5xl px-6 text-black font-semibold">
//         <span>Page No: {page}</span>
//         <div>
//           <button
//             onClick={() => setPage(page - 1)}
//             disabled={page === 1}
//             className="px-4 py-1 mx-2 border rounded-md bg-gray-300 hover:bg-gray-400 disabled:opacity-50"
//           >
//             Previous
//           </button>
//           <button
//             onClick={() => setPage(page + 1)}
//             className="px-4 py-1 border rounded-md bg-gray-300 hover:bg-gray-400"
//           >
//             Next
//           </button>
//         </div>
//         <span>Per Page: {perPage}</span>
//       </div>
//     </div>
//   );
// };

// export default TransactionsTable;
import React, { useEffect, useState } from "react";
import { fetchTransactions } from "../services/api";

const TransactionsTable = ({ month, year }) => {
  const [transactions, setTransactions] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const perPage = 10;

  useEffect(() => {
    const loadTransactions = async () => {
      try {
        const data = await fetchTransactions(month, year, search, page, perPage);
        console.log("📌 API Response:", data); // Debugging: Check API response
        if (data && data.transactions) {
          setTransactions(data.transactions);
        } else {
          setTransactions([]); // Ensure state is updated
        }
      } catch (error) {
        console.error("❌ API Fetch Error:", error);
      }
    };
    loadTransactions();
  }, [month, year, search, page]);

  return (
    <div className="bg-[#E6F0F2] min-h-screen flex flex-col items-center py-10">
      {/* Search Bar */}
      <div className="flex justify-center gap-6 mb-6">
        <input
          type="text"
          placeholder="Search transaction"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 border rounded-md bg-white shadow-sm w-64"
        />
      </div>

      {/* Transactions Table */}
      <div className="mt-8 w-full max-w-5xl">
        <table className="w-full border-collapse border border-black text-center">
          {/* Table Head */}
          <thead>
            <tr className="bg-[#F2C94C] text-black font-semibold">
              <th className="border border-black px-3 py-2">ID</th>
              <th className="border border-black px-3 py-2">Title</th>
              <th className="border border-black px-3 py-2">Description</th>
              <th className="border border-black px-3 py-2">Price</th>
              <th className="border border-black px-3 py-2">Category</th>
              <th className="border border-black px-3 py-2">Sold</th>
              <th className="border border-black px-3 py-2">Image</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {transactions.length > 0 ? (
              transactions.map((txn) => (
                <tr key={txn.id} className="border border-black">
                  <td className="border border-black px-3 py-2">{txn.id}</td>
                  <td className="border border-black px-3 py-2">{txn.title}</td>
                  <td className="border border-black px-3 py-2">{txn.description}</td>
                  <td className="border border-black px-3 py-2">${txn.price}</td>
                  <td className="border border-black px-3 py-2">{txn.category}</td>
                  <td className="border border-black px-3 py-2">{txn.sold ? "✅ Yes" : "❌ No"}</td>
                  <td className="border border-black px-3 py-2">
                    <img
                      src={txn.image || "https://via.placeholder.com/150"}
                      alt={txn.title}
                      className="w-16 h-16 object-cover rounded"
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="border border-black py-4 text-gray-500">
                  No transactions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex justify-between w-full max-w-5xl px-6 text-black font-semibold">
        <span>Page No: {page}</span>
        <div>
          <button
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
            className="px-4 py-1 mx-2 border rounded-md bg-gray-300 hover:bg-gray-400 disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={() => setPage(page + 1)}
            className="px-4 py-1 border rounded-md bg-gray-300 hover:bg-gray-400"
          >
            Next
          </button>
        </div>
        <span>Per Page: {perPage}</span>
      </div>
    </div>
  );
};

export default TransactionsTable;
