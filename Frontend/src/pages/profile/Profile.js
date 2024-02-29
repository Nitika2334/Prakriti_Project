import React from 'react';
import "./Profile.scss";
import PageMenu from '../../components/pageMenu/PageMenu';
import { useSelector } from 'react-redux';
import Card from '../../components/card/Card';

const Profile = () => {
  const { isLoading, user } = useSelector((state) => state.auth);

  const saveProfile = async() => {

  };

  const handleImageChange = async() => {

  };

  return (
    <>
      <section>
        <div className="container">
          <PageMenu />
          <h2>Profile</h2>
          <div className="--flex-start profile">
            <Card carrdClass={"card"}>
              {!isLoading && user && (
                <>
                  <div className="profile-photo">
                    <h2>
                      Profile Image
                    </h2>
                  </div>

                  <form onSubmit={saveProfile}>
                    <p>
                      <label>
                        Change Photo:
                      </label>
                      <input
                        type='file'
                        accept='image/*'
                        name='image'
                        onChange={handleImageChange}
                      />
                    </p>
                  </form>
                </>
              )}
            </Card>
          </div>
        </div>
      </section>
    </>
  );
}

export default Profile;
