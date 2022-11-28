import React, { useContext, useEffect, useState } from 'react';
import { Input } from 'baseui/input';
import { getItem } from '../../helper/Storage';
import Card from '../../components/UI/Card';
import authContext from '../../context/AuthContext';

const Profile = () => {
  const {userTime} = useContext(authContext)
    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail]  = useState("");

    useEffect(() => {
        const user = getItem("user");
        if(user) {
            setUserEmail(user?.email);
            setUserName(user?.userName);
        }
    },[]);
console.log(userTime)
    return (
        <Card>
             <div className='container'>
            <div className='col-sm-6'>
                <label>User Name</label>
              <Input
            
                name = "userName"
                value={userName}
                disabled
                readOnly
               
                overrides={{
                    Input: {
                      style: ({ $theme }) => ({
                        backgroundColor: "white"
                      })
                    }
                  }}
                />
                
            </div>
            <div className='col-sm-6'>
            <label>User Email</label>
              <Input

                name = "userEmail"
                value={ userEmail}
                disabled
                overrides={{
                    Input: {
                      style: ({ $theme }) => ({
                        backgroundColor: "white"
                      })
                    }
                  }}
                />
                
            </div>
        </div>
        </Card>
       
    )
};
export default Profile;