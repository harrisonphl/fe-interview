import { ErrorMessage, Field, Form, Formik } from "formik";
import { useContext, useEffect, useState } from "react";
import { string, object } from "yup";
import { API_URL } from "../constants";
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

  console.log(searchContext)

  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState(searchContext.searchQuery);
  const [searchResult, setSearchResult] = useState(searchContext.searchResult);

  const getData = () => {
    fetch(`${API_URL}/api/users?trackingNumber=${searchValue}`).then(res => res.json()).then(res => {
      console.log(res)
      setSearchContext({
        searchValue:{
          searchResult: [...res]
        }})
      // setSearchResult(res);
    })
  }

  const sort = (sortType) => {
    if(sortType === 'descending'){
      const sortedResult = searchResult.sort((a, b) => b.email.localeCompare(a.email));
      console.log(sortedResult)
      setSearchContext({ searchValue: { searchResult: [...sortedResult]}})
      // setSearchResult([...sortedResult]);
    } else if(sortType === 'original') {
      getData();
    } else {
      const sortedResult = searchResult.sort((a, b) => a.email.localeCompare(b.email));
      console.log(sortedResult)
      setSearchContext({ searchValue: { searchResult: [...sortedResult]}})
      // setSearchResult([...sortedResult]);
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
              // setSearchValue(e.target.value);
            }} value={searchContext.searchQuery}/>
            <button type="submit" >Search</button>
          </div>
          <div className="search-error">
            <ErrorMessage name="trackingNumber" />
          </div>
        </Form>
      </Formik>
      <div>
        <button onClick={() => sort('Ascending')}>Sort Ascending by email</button>
        <button onClick={() => sort('descending')}>Sort descending by email</button>
        <button onClick={() => sort('original')}>Sort orignal by email</button>
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
            {searchResult && searchResult.map((item) => (
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
