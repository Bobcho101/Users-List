import { useEffect, useState } from "react"
import Footer from "./components/Footer"
import Header from "./components/Header"
import List from "./components/List"
import UserCreate from "./components/userCreate";
import { fetchUsers } from "./services/usersApi";
import UserInfo from "./components/UserInfo";
import UserDelete from "./components/UserDelete";
import UserEdit from "./components/UserEdit";

function App() {
    const [isUserCreationVisible, setIsUserCreationVisible] = useState(false);
    const [isInfoVisible, setInfoVisible] = useState(false);
    const [isDeleteVisible, setDeleteVisible] = useState(false);
    const [isEditVisible, setEditVisible] = useState(false);
    const [currentUser, setCurrentUser] = useState({});
    const [query, setQuery] = useState("");
    const [selectedFilter, setSelectedFilter] = useState("all");

    const changeUserCreationVisible = () => {
        setIsUserCreationVisible((curState => !curState));
    }

    const [users, setUsers] = useState([]);

    const renderData = async () => {
        fetchUsers()
        .then(data => {
            setUsers(data);
        })
        .catch(err => console.log(err.message))
    }
    useEffect(() => {
        renderData();
    }, []);

    const showInfo = (user) => {
        setCurrentUser(user);
        setInfoVisible(visible => !visible);
    }

    const showDelete = (userId) => {
        setCurrentUser(userId);
        setDeleteVisible(visible => !visible);
    }

    const showEdit = (user) => {
        setCurrentUser(user);
        setEditVisible(visible => !visible)
    }

    const changeSelectedFilter = (filter) => {
        setSelectedFilter(filter);
    }

    const submitSearchHandler = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const value = formData.get('search');
        setQuery(value);
    }

    const clearSearchHandler = (e) => {
        e.preventDefault();
        setQuery("");
    }
    return (
    <> 
    <Header />
  <main className="main">
    {/* Section component  */}
    <section className="card users-container">
      {/* Search bar component */}
      <form className="search-form" onSubmit={submitSearchHandler}>
        <h2>
          <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="fas"
            data-icon="user"
            className="svg-inline--fa fa-user SearchBar_icon__cXpTg"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
          >
            <path
              fill="currentColor"
              d="M224 256c70.7 0 128-57.31 128-128s-57.3-128-128-128C153.3 0 96 57.31 96 128S153.3 256 224 256zM274.7 304H173.3C77.61 304 0 381.6 0 477.3c0 19.14 15.52 34.67 34.66 34.67h378.7C432.5 512 448 496.5 448 477.3C448 381.6 370.4 304 274.7 304z"
            ></path>
          </svg>
          <span>Users</span>
        </h2>
        <div className="search-input-container">
          <input
            type="text"
            placeholder="Please, select the search criteria"
            name="search"
          />
          {/* Show the clear button only if input field length !== 0 */}
          <button className="btn close-btn" onClick={clearSearchHandler} >
            <i className="fa-solid fa-xmark" />
          </button>
          <button className="btn" title="Please, select the search criteria">
            <i className="fa-solid fa-magnifying-glass" />
          </button>
        </div>
        <div className="filter">
          <span>Search Criteria:</span>
          <select name="criteria" className="criteria" onChange={(e) => changeSelectedFilter(e.target.value)}>
            <option value="all">Not selected</option>
            <option value="firstName">First Name</option>
            <option value="lastName">Last Name</option>
            <option value="email">Email</option>
            <option value="phoneNumber">Phone</option>
          </select>
        </div>
      </form>
      {/* Table component */}
      <div className="table-wrapper">
        {/* Overlap components  */}
        {/* <div class="loading-shade"> */}
        {/* Loading spinner  */}
        {/* <div class="spinner"></div> */}
        {/* 
  No users added yet  */}
        {/* <div class="table-overlap">
        <svg
          aria-hidden="true"
          focusable="false"
          data-prefix="fas"
          data-icon="triangle-exclamation"
          class="svg-inline--fa fa-triangle-exclamation Table_icon__+HHgn"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <path
            fill="currentColor"
            d="M506.3 417l-213.3-364c-16.33-28-57.54-28-73.98 0l-213.2 364C-10.59 444.9 9.849 480 42.74 480h426.6C502.1 480 522.6 445 506.3 417zM232 168c0-13.25 10.75-24 24-24S280 154.8 280 168v128c0 13.25-10.75 24-23.1 24S232 309.3 232 296V168zM256 416c-17.36 0-31.44-14.08-31.44-31.44c0-17.36 14.07-31.44 31.44-31.44s31.44 14.08 31.44 31.44C287.4 401.9 273.4 416 256 416z"
          ></path>
        </svg>
        <h2>There is no users yet.</h2>
      </div> */}
        {/* No content overlap component  */}
        {/* <div class="table-overlap">
        <svg
          aria-hidden="true"
          focusable="false"
          data-prefix="fas"
          data-icon="triangle-exclamation"
          class="svg-inline--fa fa-triangle-exclamation Table_icon__+HHgn"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <path
            fill="currentColor"
            d="M506.3 417l-213.3-364c-16.33-28-57.54-28-73.98 0l-213.2 364C-10.59 444.9 9.849 480 42.74 480h426.6C502.1 480 522.6 445 506.3 417zM232 168c0-13.25 10.75-24 24-24S280 154.8 280 168v128c0 13.25-10.75 24-23.1 24S232 309.3 232 296V168zM256 416c-17.36 0-31.44-14.08-31.44-31.44c0-17.36 14.07-31.44 31.44-31.44s31.44 14.08 31.44 31.44C287.4 401.9 273.4 416 256 416z"
          ></path>
        </svg>
        <h2>Sorry, we couldn't find what you're looking for.</h2>
      </div> */}
        {/* On error overlap component  */}
        {/* <div class="table-overlap">
        <svg
          aria-hidden="true"
          focusable="false"
          data-prefix="fas"
          data-icon="triangle-exclamation"
          class="svg-inline--fa fa-triangle-exclamation Table_icon__+HHgn"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <path
            fill="currentColor"
            d="M506.3 417l-213.3-364c-16.33-28-57.54-28-73.98 0l-213.2 364C-10.59 444.9 9.849 480 42.74 480h426.6C502.1 480 522.6 445 506.3 417zM232 168c0-13.25 10.75-24 24-24S280 154.8 280 168v128c0 13.25-10.75 24-23.1 24S232 309.3 232 296V168zM256 416c-17.36 0-31.44-14.08-31.44-31.44c0-17.36 14.07-31.44 31.44-31.44s31.44 14.08 31.44 31.44C287.4 401.9 273.4 416 256 416z"
          ></path>
        </svg>
        <h2>Failed to fetch</h2>
      </div> */}
        {/* </div> */}
        <table className="table">
          <List users={users} query={query} showInfo={showInfo} 
          showDelete={showDelete} showEdit={showEdit} 
          changeSelectedFilter={changeSelectedFilter}
          selectedFilter={selectedFilter}
          />
        </table>
      </div>
      {/* New user button  */}
      <button className="btn-add btn" onClick={changeUserCreationVisible}>Add new user</button>
      {/* Pagination component  */}
      <div className="pagination position">
        <div className="limits">
          <span>Items per page:</span>
          <select name="limit" className="limit" defaultValue={5}>
            <option value={5}>5</option>
            <option value={5}>10</option>
            <option value={5}>15</option>
            <option value={5}>20</option>
          </select>
        </div>
        <p className="pages">1 - 1 of 1</p>
        <div className="actions">
          <button className="btn" title="First Page">
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="angles-left"
              className="svg-inline--fa fa-angles-left"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
            >
              <path
                fill="currentColor"
                d="M77.25 256l137.4-137.4c12.5-12.5 12.5-32.75 0-45.25s-32.75-12.5-45.25 0l-160 160c-12.5 12.5-12.5 32.75 0 45.25l160 160C175.6 444.9 183.8 448 192 448s16.38-3.125 22.62-9.375c12.5-12.5 12.5-32.75 0-45.25L77.25 256zM269.3 256l137.4-137.4c12.5-12.5 12.5-32.75 0-45.25s-32.75-12.5-45.25 0l-160 160c-12.5 12.5-12.5 32.75 0 45.25l160 160C367.6 444.9 375.8 448 384 448s16.38-3.125 22.62-9.375c12.5-12.5 12.5-32.75 0-45.25L269.3 256z"
              ></path>
            </svg>
          </button>
          <button className="btn" title="Previous Page">
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="angle-left"
              className="svg-inline--fa fa-angle-left"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 256 512"
            >
              <path
                fill="currentColor"
                d="M192 448c-8.188 0-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25l160-160c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L77.25 256l137.4 137.4c12.5 12.5 12.5 32.75 0 45.25C208.4 444.9 200.2 448 192 448z"
              ></path>
            </svg>
          </button>
          <button className="btn" title="Next Page">
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="angle-right"
              className="svg-inline--fa fa-angle-right"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 256 512"
            >
              <path
                fill="currentColor"
                d="M64 448c-8.188 0-16.38-3.125-22.62-9.375c-12.5-12.5-12.5-32.75 0-45.25L178.8 256L41.38 118.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l160 160c12.5 12.5 12.5 32.75 0 45.25l-160 160C80.38 444.9 72.19 448 64 448z"
              ></path>
            </svg>
          </button>
          <button className="btn" title="Last Page">
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="angles-right"
              className="svg-inline--fa fa-angles-right"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
            >
              <path
                fill="currentColor"
                d="M246.6 233.4l-160-160c-12.5-12.5-32.75-12.5-45.25 0s-12.5 32.75 0 45.25L178.8 256l-137.4 137.4c-12.5 12.5-12.5 32.75 0 45.25C47.63 444.9 55.81 448 64 448s16.38-3.125 22.62-9.375l160-160C259.1 266.1 259.1 245.9 246.6 233.4zM438.6 233.4l-160-160c-12.5-12.5-32.75-12.5-45.25 0s-12.5 32.75 0 45.25L370.8 256l-137.4 137.4c-12.5 12.5-12.5 32.75 0 45.25C239.6 444.9 247.8 448 256 448s16.38-3.125 22.62-9.375l160-160C451.1 266.1 451.1 245.9 438.6 233.4z"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </section>

    {isUserCreationVisible && <UserCreate refreshUsers={renderData} setIsUserCreationVisible={setIsUserCreationVisible} />}
    {isInfoVisible && <UserInfo hideInfo={showInfo} currentUser={currentUser} />}
    {isDeleteVisible && <UserDelete refreshUsers={renderData} hideDelete={showDelete} currentUserId={currentUser} />}
    {isEditVisible && <UserEdit hideEdit={showEdit} currentUser={currentUser} refreshUsers={renderData} />}
    {/* User details component  */}
    {/* <div class="overlay">
<div class="backdrop"></div>
<div class="modal">
  <div class="detail-container">
    <header class="headers">
      <h2>User Detail</h2>
      <button class="btn close">
        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="xmark"
          class="svg-inline--fa fa-xmark" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
          <path fill="currentColor"
            d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z">
          </path>
        </svg>
      </button>
    </header>
    <div class="content">
      <div class="image-container">
        <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png" alt=""
          class="image" />
      </div>
      <div class="user-details">
        <p>User Id: <strong>62bb0c0eda039e2fdccba57b</strong></p>
        <p>
          Full Name:
          <strong> Peter Johnson </strong>
        </p>
        <p>Email: <strong>peter@abv.bg</strong></p>
        <p>Phone Number: <strong>0812345678</strong></p>
        <p>
          Address:
          <strong> Bulgaria, Sofia, Aleksandar Malinov 78 </strong>
        </p>

        <p>Created on: <strong>Wednesday, June 28, 2022</strong></p>
        <p>Modified on: <strong>Thursday, June 29, 2022</strong></p>
      </div>
    </div>
  </div>
</div>
    </div> */}
    {/* Create/Edit Form component  */}
    {/* <div class="overlay">
<div class="backdrop"></div>
<div class="modal">
  <div class="user-container">
    <header class="headers">
      <h2>Edit User/Add User</h2>
      <button class="btn close">
        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="xmark"
          class="svg-inline--fa fa-xmark" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
          <path fill="currentColor"
            d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z">
          </path>
        </svg>
      </button>
    </header>
    <form>
      <div class="form-row">
        <div class="form-group">
          <label for="firstName">First name</label>
          <div class="input-wrapper">
            <span><i class="fa-solid fa-user"></i></span>
            <input id="firstName" name="firstName" type="text" />
          </div>
        </div>
        <div class="form-group">
          <label for="lastName">Last name</label>
          <div class="input-wrapper">
            <span><i class="fa-solid fa-user"></i></span>
            <input id="lastName" name="lastName" type="text" />
          </div>
        </div>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label for="email">Email</label>
          <div class="input-wrapper">
            <span><i class="fa-solid fa-envelope"></i></span>
            <input id="email" name="email" type="text" />
          </div>
        </div>
        <div class="form-group">
          <label for="phoneNumber">Phone number</label>
          <div class="input-wrapper">
            <span><i class="fa-solid fa-phone"></i></span>
            <input id="phoneNumber" name="phoneNumber" type="text" />
          </div>
        </div>
      </div>

      <div class="form-group long-line">
        <label for="imageUrl">Image Url</label>
        <div class="input-wrapper">
          <span><i class="fa-solid fa-image"></i></span>
          <input id="imageUrl" name="imageUrl" type="text" />
        </div>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label for="country">Country</label>
          <div class="input-wrapper">
            <span><i class="fa-solid fa-map"></i></span>
            <input id="country" name="country" type="text" />
          </div>
        </div>
        <div class="form-group">
          <label for="city">City</label>
          <div class="input-wrapper">
            <span><i class="fa-solid fa-city"></i></span>
            <input id="city" name="city" type="text" />
          </div>
        </div>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label for="street">Street</label>
          <div class="input-wrapper">
            <span><i class="fa-solid fa-map"></i></span>
            <input id="street" name="street" type="text" />
          </div>
        </div>
        <div class="form-group">
          <label for="streetNumber">Street number</label>
          <div class="input-wrapper">
            <span><i class="fa-solid fa-house-chimney"></i></span>
            <input id="streetNumber" name="streetNumber" type="text" />
          </div>
        </div>
      </div>
      <div id="form-actions">
        <button id="action-save" class="btn" type="submit">Save</button>
        <button id="action-cancel" class="btn" type="button">
          Cancel
        </button>
      </div>
    </form>
  </div>
</div>
    </div> */}
    {/* Delete user component  */}
    {/* <div class="overlay">
<div class="backdrop"></div>
<div class="modal">
  <div class="confirm-container">
    <header class="headers">
      <h2>Are you sure you want to delete this account?</h2>
      <button class="btn close">
        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="xmark"
          class="svg-inline--fa fa-xmark" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
          <path fill="currentColor"
            d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z">
          </path>
        </svg>
      </button>
    </header>
    <div class="actions">
      <div id="form-actions">
        <button id="action-save" class="btn" type="submit">Delete</button>
        <button id="action-cancel" class="btn" type="button">
          Cancel
        </button>
      </div>
    </div>
  </div>
</div>
    </div> */}
    </main>
    <Footer />
    </>
  )
}

export default App
