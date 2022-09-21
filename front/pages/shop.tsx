import Image from "next/image";
import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import axios from "../util/axios";
import { LockClosedIcon, PlusIcon } from "@heroicons/react/solid";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { addProducts, ProductsState, ProductState } from "../store/products";
import { addItemToCart, CartItemState } from "../store/cart";
function Shop() {
  const { products }: ProductsState = useSelector(
    (state: RootState) => state.products
  );
  const dispatch = useDispatch();
  const [startPage, setStartPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [lastPage, setLastPage] = useState(0);
  useEffect(() => {
    axios
      .get("products?page=1&pageSize=20")
      .then((res) => {
        dispatch(addProducts(res.data.Products));
        setStartPage(res.data.FirstPage);
        setCurrentPage(res.data.CurrentPage);
        setLastPage(res.data.LastPage);
      })
      .catch((error) => error);
  }, []);

  const fetchNewData = (page: number, event: Event) => {
    event.preventDefault();

    axios
      .get(`products?page=${page}&pageSize=20`)
      .then((res) => {
        dispatch(addProducts(res.data.Products));
        setStartPage(res.data.FirstPage);
        setCurrentPage(res.data.CurrentPage);
        setLastPage(res.data.LastPage);
      })
      .catch((error) => error);
  };

  const getPaginationList = () => {
    const rowList = [];
    if (currentPage > 2) {
      rowList.push(
        <li key={startPage}>
          <a
            // @ts-ignore
            onClick={(event: Event) => fetchNewData(1, event)}
            href=""
            className={`py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700`}
          >
            {1}
          </a>
        </li>
      );
    }
    let numberOfIteration = 0;
    for (
      let i = lastPage - currentPage >= 3 ? currentPage - 1 : lastPage - 3;
      i <= lastPage;
      i++
    ) {
      if (numberOfIteration === 4) break;
      if (i === 0) continue;
      rowList.push(
        <li key={i}>
          <a
            // @ts-ignore
            onClick={(event: Event) => fetchNewData(i, event)}
            href=""
            className={`py-2 px-3 ${
              i === currentPage
                ? "text-blue-600 bg-blue-50"
                : "leading-tight text-gray-500 bg-white"
            } border border-gray-300 hover:bg-gray-100 hover:text-gray-700`}
          >
            {i}
          </a>
        </li>
      );
      numberOfIteration++;
    }
    if (lastPage - currentPage >= 3) {
      rowList.push(
        <li key={lastPage}>
          <a
            // @ts-ignore
            onClick={(event: Event) => fetchNewData(lastPage, event)}
            href=""
            className={`py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700`}
          >
            {lastPage}
          </a>
        </li>
      );
    }
    return rowList;
  };

  const addToCart = (event: FormEvent, id: number, price: number) => {
    event.preventDefault();
    // const ID: CartItemState = { ID: id };
    dispatch(addItemToCart({ ID: id, QTY: 1, price }));
  };

  return (
    <div className="bg-white">
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">
          Shop
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products.length > 0 &&
            products.map(
              (product) =>
                product && (
                  <div key={product.ID} className="group relative">
                    <a
                      onClick={(event) =>
                        addToCart(
                          event,
                          product.ID,
                          product.price + product.additionalPrice
                        )
                      }
                      href=""
                      className={
                        "absolute z-10 p-2 bg-blue-500 hover:bg-blue-400 rounded-3xl right-2 top-2"
                      }
                    >
                      <PlusIcon
                        className="h-5 w-5 text-white"
                        aria-hidden="true"
                      />
                    </a>
                    <div className="min-h-80 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80">
                      <Image
                        src={
                          "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg"
                        }
                        width={350}
                        height={450}
                        alt={product.image}
                        className="w-full h-full object-center object-cover lg:w-full lg:h-full"
                      />
                    </div>
                    <div className="mt-4 flex justify-between">
                      <div>
                        <h3 className="text-sm text-gray-700">
                          <Link href={"/product/" + product.ID}>
                            <a>
                              <span
                                aria-hidden="true"
                                className="absolute inset-0"
                              />
                              {product.title}
                            </a>
                          </Link>
                        </h3>
                      </div>
                      <p className="text-sm font-medium text-gray-900">
                        {product.Currency.code +
                          " " +
                          (product.price + product.additionalPrice)}
                      </p>
                    </div>
                  </div>
                )
            )}
        </div>
      </div>
      <nav
        aria-label="Page navigation example"
        className="w-full flex justify-center"
      >
        <ul className="inline-flex -space-x-px my-10">
          <li>
            <a
              // @ts-ignore
              onClick={(event: Event) =>
                fetchNewData(
                  currentPage === startPage ? currentPage : currentPage - 1,
                  event
                )
              }
              href=""
              className={`${
                currentPage === startPage
                  ? "cursor-default pointer-events-none decoration-0 text-gray-500 "
                  : ""
              }py-2 px-3 ml-0 leading-tight text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700`}
            >
              Previous
            </a>
          </li>
          {getPaginationList()}
          <li>
            <a
              // @ts-ignore
              onClick={(event: Event) =>
                fetchNewData(
                  currentPage === lastPage ? currentPage : currentPage + 1,
                  event
                )
              }
              href=""
              className={`${
                currentPage === lastPage
                  ? "cursor-default pointer-events-none decoration-0 text-gray-500 "
                  : ""
              }py-2 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700`}
            >
              Next
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}
// This gets called on every request
// export async function getServerSideProps(context: GetServerSidePropsContext) {
//   // Fetch data from external API
//   const data = await axios.get("products?page=1&pageSize=10", {
//     headers: {
//       Cookie: `jwt=${context.req.cookies.jwt}`,
//     },
//   });
//
//   // Pass data to the page via props
//   return { props: { data: data.data } };
// }

export default Shop;
