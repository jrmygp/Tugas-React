import {
  Box,
  Text,
  Input,
  Center,
  FormLabel,
  Flex,
  Button,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { axiosInstance } from "../configs/api";
import { useSearchParams } from "react-router-dom";

const ProductCard = ({ productName, price, category }) => {
  return (
    <Box
      margin="2"
      borderWidth={1}
      borderColor="gray"
      borderRadius="4px"
      width="150px"
      padding="4"
    >
      <Text fontSize="large" fontWeight="bold">
        {productName}
      </Text>
      <Text>Rp. {price}</Text>
      <Text>{category}</Text>
    </Box>
  );
};

const ProductPage = () => {
  const [productList, setProductList] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const [searchParams, setSearchParams] = useSearchParams();

  const [searchValue, setSearchValue] = useState(
    searchParams.get("search") ? searchParams.get("search") : ""
  );
  const [currentPage, setCurrentPage] = useState(
    searchParams.get("page") ? parseInt(searchParams.get("page")) : 1
  );

  const pageLimit = 3;

  const inputHandler = (event) => {
    const { value } = event.target;

    setSearchInput(value);
  };

  const fetchProducts = (
    queryParams = {
      params: {
        _limit: pageLimit,
      },
    }
  ) => {
    axiosInstance
      .get("/products", queryParams)
      .then((res) => {
        setProductList(res.data);
      })
      .catch((err) => {
        console.log(err);
        alert("Terjadi kesalahan di server");
      });
  };

  const renderProducts = () => {
    return productList.map((val) => {
      return (
        <ProductCard
          category={val.category}
          price={val.price}
          productName={val.product_name}
        />
      );
    });
  };

  const searchButtonHandler = () => {
    setSearchValue(searchInput);
    setCurrentPage(1);

    setSearchParams({ search: searchInput, page: 1 });
  };

  const paginationHandler = (direction = "next") => {
    let newPage = currentPage;

    if (direction === "prev" && currentPage === 1) {
      return;
    }

    if (direction === "next") {
      newPage += 1;
    } else if (direction === "prev") {
      newPage -= 1;
    }

    setSearchParams({ page: newPage, search: searchValue });
    setCurrentPage(newPage);
  };

  useEffect(() => {
    let product_name = searchParams.get("search");
    let _page = searchParams.get("page");

    fetchProducts({
      params: {
        _limit: pageLimit,
        _page: _page,
        product_name: product_name ? product_name : undefined,
      },
    });
  }, [currentPage, searchInput]);

  return (
    <Center>
      <Box width="xl">
        <Text fontSize="2xl" marginBottom="8">
          Products Page
        </Text>

        <FormLabel htmlFor="searchProduct">Product Name</FormLabel>
        <Input onChange={inputHandler} id="searchProduct" />
        <Button onClick={searchButtonHandler} marginTop="1">
          Search
        </Button>

        <Flex wrap="wrap" marginTop="4" justifyContent="center">
          {renderProducts()}
        </Flex>

        <Flex justifyContent="center">
          <Button onClick={() => paginationHandler("prev")} marginX="2">
            Previous Page
          </Button>
          <Text fontSize="2xl">{currentPage}</Text>
          <Button onClick={() => paginationHandler("next")} marginX="2">
            Next Page
          </Button>
        </Flex>
      </Box>
    </Center>
  );
};

export default ProductPage;
