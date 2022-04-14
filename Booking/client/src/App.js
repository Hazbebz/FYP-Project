import React, { useState } from "react";

import Book from "./components/book";
import Confirm from "./components/Confirm";
import Home from "./components_web/Home"

export default _ => {
  const [page, setPage] = useState(4);

  return (
    <div>
      {page === 1 ? <Book setPage={setPage} /> : null}
      {page === 2 ? <Confirm /> : null}
      {page === 4? <Home setPage={setPage}/> : null}
    </div>
  );
};
