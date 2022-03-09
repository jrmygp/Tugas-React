import {
  Box,
  Text,
  Input,
  Center,
  FormLabel,
  Flex,
  Button,
  Select,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { axiosInstance } from "../configs/api";
import { jobs } from "../fake-api/jobs";

const UserCard = ({ firstName, lastName, gender, job }) => {
  return (
    <Box
      margin="2"
      borderWidth={1}
      borderColor="gray"
      borderRadius="4px"
      width="250px"
      padding="4"
    >
      <Text fontSize="large" fontWeight="bold">
        {firstName} {lastName}
      </Text>
      <Text>Gender: {gender}</Text>
      <Text>Job: {job}</Text>
    </Box>
  );
};

const UserPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [userList, setUserList] = useState([]);
  const [currentPage, setCurrentPage] = useState(
      searchParams.get("page") ? parseInt(searchParams.get("page")) : 1
  );
  const [searchInput, setSearchInput] = useState("");
  const [searchValue, setSearchValue] = useState(
      searchParams.get("search") ? searchParams.get("search") : ""
  );
  const [genderInput, setGenderInput] = useState("");
  const [genderValue, setGenderValue] = useState(
      searchParams.get("gender") ? searchParams.get("search") : ""
  );
  const [jobInput, setJobInput] = useState("");
  const [jobValue, setJobValue] = useState(
      searchParams.get("job") ? searchParams.get("search") : ""
  );

  const inputHandler = (event) => {
    const { value } = event.target;

    setSearchInput(value);
  };

  const genderHandler = (event) => {
    const { value } = event.target;

    setGenderInput(value);
  };

  const jobHandler = (event) => {
    const { value } = event.target;

    setJobInput(value);
  };

  const pageLimit = 10;

  const pageHandler = (direction = "next") => {
    let newPage = currentPage;
    if (direction === "next") {
      newPage += 1;
    } else if (direction === "prev") {
      newPage -= 1;
    }

    let newSearchParams = {page: newPage} 
    if (searchValue) {
        newSearchParams.search = searchValue
    }
    if (genderValue) {
        newSearchParams.gender = genderValue
    }
    if (jobValue) {
        newSearchParams.job = jobValue
    }

    setSearchParams (newSearchParams)
    setCurrentPage(newPage);
  };

  const fetchData = (
    queryParams = {
      params: {
        _limit: pageLimit,
      },
    }
  ) => {
    axiosInstance
      .get("/users", queryParams)
      .then((res) => {
        setUserList(res.data);
      })
      .catch((err) => {
        console.log(err);
        alert("Terjadi kesalahan dalam server");
      });
  };

  const renderData = () => {
    return userList.map((val) => {
      return (
        <UserCard
          firstName={val.first_name}
          lastName={val.last_name}
          gender={val.gender}
          job={val.job_area}
        />
      );
    });
  };

  const searchButtonHandler = () => {
    setSearchValue(searchInput);
    setCurrentPage(1);
    setGenderValue(genderInput);
    setJobValue(jobInput);

    let newSearchParams = { page: 1 }
    if (searchInput) {
        newSearchParams.search = searchInput
    }
    if (genderInput) {
        newSearchParams.gender = genderInput
    }
    if (jobInput) {
        newSearchParams.job = jobInput
    }
    setSearchParams (newSearchParams)
  };

  const renderJob = () => {
    return jobs.map((val) => {
      return <option value={val}>{val}</option>;
    });
  };

  useEffect(() => {
      let first_name = searchParams.get("search")
      let _page = searchParams.get("page")
      let gender = searchParams.get("gender")
      let job_area = searchParams.get("job")
    fetchData({
      params: {
        _limit: pageLimit,
        _page: currentPage,
        first_name: searchValue ? searchValue : undefined,
        gender: genderValue ? genderValue : undefined,
        job_area: jobValue ? jobValue : undefined,
      },
    });
  }, [currentPage, searchValue, genderValue, jobValue]);
  return (
    <Center margin={10}>
      <Box width="xl">
        <Text fontSize="2xl" marginBottom="8">
          Users Page
        </Text>

        <FormLabel htmlFor="searchProduct">User's Name</FormLabel>
        <Input onChange={inputHandler} />
        <Select onChange={genderHandler}>
          <option value="">Select Gender</option>
          <option value="Female">Female</option>
          <option value="Male">Male</option>
        </Select>
        <Select placeholder="Select Job" onChange={jobHandler}>
          {renderJob()}
        </Select>
        <Button onClick={searchButtonHandler} marginTop="1">
          Search
        </Button>

        <Flex wrap="wrap" marginTop="4" justifyContent="center">
          {renderData()}
        </Flex>

        <Flex justifyContent="center">
          <Button onClick={() => pageHandler("prev")} marginX="2">
            Previous Page
          </Button>
          <Text fontSize="2xl"></Text>
          <Button onClick={() => pageHandler("next")} marginX="2">
            Next Page
          </Button>
        </Flex>
      </Box>
    </Center>
  );
};
export default UserPage;
