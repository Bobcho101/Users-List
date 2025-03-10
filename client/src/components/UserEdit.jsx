import { editUser } from "../services/usersApi";

export default function UserEdit({ hideEdit, currentUser, refreshUsers }){

    const editUserHandler = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const firstName = formData.get('firstName');
        const lastName = formData.get('lastName');
        const email = formData.get('email');
        const phoneNumber = formData.get('phoneNumber');
        const imageUrl = formData.get('imageUrl');
        
        const country = formData.get('country');
        const city = formData.get('city');
        const street = formData.get('street');
        const streetNumber = formData.get('streetNumber');

        if(firstName.trim() == "" || lastName.trim() == "" || email.trim() == "" ||
        phoneNumber.trim() == "" || imageUrl.trim() == "" || country.trim() == "" ||
        street.trim() == "" || streetNumber.trim() == "") return;

        const address = {
            country,
            city,
            street,
            streetNumber
        };


        try{
            await editUser(currentUser._id, {
                _id: currentUser._id,
                firstName,
                lastName,
                email,
                phoneNumber,
                imageUrl,
                address,
                createdAt: currentUser.createdAt,
                updatedAt: new Date().toISOString(),
            })
        } catch(err){
            console.log(err.message); 
        }

    
        hideEdit();
        refreshUsers();
    }

    return(
        <>
        <div className="overlay">
            <div className="backdrop" />
            <div className="modal">
                <div className="user-container">
                <header className="headers">
                    <h2>Edit User</h2>
                    <button className="btn close" onClick={() => hideEdit()}>
                    <svg
                        aria-hidden="true"
                        focusable="false"
                        data-prefix="fas"
                        data-icon="xmark"
                        className="svg-inline--fa fa-xmark"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 320 512"
                    >
                        <path
                        fill="currentColor"
                        d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z"
                        ></path>
                    </svg>
                    </button>
                </header>
                <form onSubmit={editUserHandler}>
                    <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="firstName">First name</label>
                        <div className="input-wrapper">
                        <span>
                            <i className="fa-solid fa-user" />
                        </span>
                        <input id="firstName" name="firstName" type="text" defaultValue={currentUser.firstName} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="lastName">Last name</label>
                        <div className="input-wrapper">
                        <span>
                            <i className="fa-solid fa-user" />
                        </span>
                        <input id="lastName" name="lastName" type="text" defaultValue={currentUser.lastName} />
                        </div>
                    </div>
                    </div>
                    <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <div className="input-wrapper">
                        <span>
                            <i className="fa-solid fa-envelope" />
                        </span>
                        <input id="email" name="email" type="text" defaultValue={currentUser.email} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="phoneNumber">Phone number</label>
                        <div className="input-wrapper">
                        <span>
                            <i className="fa-solid fa-phone" />
                        </span>
                        <input id="phoneNumber" name="phoneNumber" type="text" defaultValue={currentUser.phoneNumber} />
                        </div>
                    </div>
                    </div>
                    <div className="form-group long-line">
                    <label htmlFor="imageUrl">Image Url</label>
                    <div className="input-wrapper">
                        <span>
                        <i className="fa-solid fa-image" />
                        </span>
                        <input id="imageUrl" name="imageUrl" type="text" defaultValue={currentUser.imageUrl} />
                    </div>
                    </div>
                    <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="country">Country</label>
                        <div className="input-wrapper">
                        <span>
                            <i className="fa-solid fa-map" />
                        </span>
                        <input id="country" name="country" type="text" defaultValue={currentUser.address.country} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="city">City</label>
                        <div className="input-wrapper">
                        <span>
                            <i className="fa-solid fa-city" />
                        </span>
                        <input id="city" name="city" type="text" defaultValue={currentUser.address.city} />
                        </div>
                    </div>
                    </div>
                    <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="street">Street</label>
                        <div className="input-wrapper">
                        <span>
                            <i className="fa-solid fa-map" />
                        </span>
                        <input id="street" name="street" type="text" defaultValue={currentUser.address.street} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="streetNumber">Street number</label>
                        <div className="input-wrapper">
                        <span>
                            <i className="fa-solid fa-house-chimney" />
                        </span>
                        <input id="streetNumber" name="streetNumber" type="text" defaultValue={currentUser.address.streetNumber} />
                        </div>
                    </div>
                    </div>
                    <div id="form-actions">
                    <button id="action-save" className="btn" type="submit">
                        Save
                    </button>
                    <button id="action-cancel" className="btn" type="button" onClick={() => hideEdit()}>
                        Cancel
                    </button>
                    </div>
                </form>
                </div>
            </div>
        </div>
        </>
    )
}