import { ErrorMessage, Field, Form, Formik } from "formik";
import { useContext, useEffect, useState } from "react";
import { string, object } from "yup";
import { API_URL, SortOrder } from "../constants";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../SearchContext";

const formInitialValues = { trackingNumber: "" };

const trackingNumberRegex = /^[A-Za-z\d-]*$/;

const validationSchema = object().shape({
  trackingNumber: string()
    .matches(
      trackingNumberRegex,
      ({ label }) =>
        `${label} may only contain alphanumeric characters and dashes (-)`
    )
    .required()
    .label("Tracking Number"),
});

const UserSearch = () => {
  const { searchContext, setSearchContext } = useContext(SearchContext);

  const navigate = useNavigate();
  // const [searchValue, setSearchValue] = useState(searchContext.searchQuery);
  // const [searchResult, setSearchResult] = useState(searchContext.searchResult);

  const getData = () => {
    console.log('getData()')
    // console.log(searchValue)
    console.log(searchContext.searchQuery)
    fetch(`${API_URL}/api/users?trackingNumber=${searchContext.searchQuery}`)
    .then(res => res.json())
    .then(res => {
      console.log(res)
      setSearchContext({
          searchQuery: searchContext.searchQuery,
          searchResult: [...res],
          originalOrder: [...res]
        })
    })
  }

  const sort = (sortType) => {
    const oldContext = searchContext
    if(sortType === SortOrder.DESCENDING){
      const sortedResult = searchContext.searchResult.sort((a, b) => b.email.localeCompare(a.email));
      console.log(sortedResult)
      oldContext.searchResult = [...sortedResult]
      setSearchContext(oldContext)
    } else if(sortType === SortOrder.ORIGINAL) {
      console.log(searchContext)
      setSearchContext({searchResult: [...searchContext.originalOrder]})
    } else {
      const sortedResult = searchContext.searchResult.sort((a, b) => a.email.localeCompare(b.email));
      console.log(sortedResult)
      setSearchContext({searchResult: [...sortedResult]})
    }
  }

  return (
    <div>
      <h1>User Search</h1>
      <Formik
        initialValues={formInitialValues}
        // validationSchema={validationSchema}
        validateOnBlur
        onSubmit={getData}
      >
        <Form>
          <div className="search-input">
            {/* <Field name="trackingNumber" placeholder="Tracking Number" /> */}
            <input name="trackingNumber" placeholder="Tracking Number" onChange={(e) => {
              setSearchContext({ searchQuery: e.target.value })
            }} value={searchContext.searchQuery || ''}/>
            <button type="submit">Search</button>
          </div>
          <div className="search-error">
            <ErrorMessage name="trackingNumber" />
          </div>
        </Form>
      </Formik>
      <div>
        <button onClick={() => sort(SortOrder.ASCENDING)}>Sort Ascending by email</button>
        <button onClick={() => sort(SortOrder.DESCENDING)}>Sort descending by email</button>
        <button onClick={() => sort(SortOrder.ORIGINAL)}>Sort orignal by email</button>
      </div>
      <div className="search-results">
        <table>
          <thead>
            <tr>
            <th>email</th>
              <th>first name</th>
              <th>last name</th>
            </tr>
          </thead>
          <tbody>
            {searchContext.searchResult && searchContext.searchResult.map((item) => (
              <tr key={item.id} onClick={() => navigate(`/user/${item.id}`)}>
              <th>{item.email}</th>
              <th>{item.first}</th>
              <th>{item.last}</th>
            </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export { UserSearch };
