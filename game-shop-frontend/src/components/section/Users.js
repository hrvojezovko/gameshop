import React, {Component} from 'react'
import '../css/Users.css'

class Users extends Component {
    render(){
        return (
            <table>
                <thead>
                    <tr>
                        <td className="action"><input title="SELECT ALL" type="checkbox" name="user"></input></td>
                        <td>Username</td>
                        <td>Id</td>
                        <td className="emaill">Email address</td>
                        <td>Role</td>
                        <td className="action">Action</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><input type="checkbox" name="user"></input></td>
                        <td className="left">galanterija22</td>
                        <td>23sF3sW</td>
                        <td className="left">tekilalimunsol@hotmail.com</td>
                        <td>User</td>
                        <td><i title="DELETE USER" class="fas fa-trash"></i></td>
                    </tr>
                    <tr>
                        <td><input type="checkbox" name="user"></input></td>
                        <td className="left">molotovljev.koktel44</td>
                        <td>iu31h97</td>
                        <td className="left">zeus.hera@gmail.com</td>
                        <td>User</td>
                        <td><i title="DELETE USER" class="fas fa-trash"></i></td>
                    </tr>
                    <tr>
                        <td><input type="checkbox" name="user"></input></td>
                        <td className="left">tihiubica</td>
                        <td>b8r6F8v</td>
                        <td className="left">dalmatinac99@gmail.com</td>
                        <td>Admin</td>
                        <td><i title="DELETE USER" class="fas fa-trash"></i></td>
                    </tr>
                    <tr>
                        <td><input type="checkbox" name="user"></input></td>
                        <td className="left">maestro99</td>
                        <td>b87Z6V5</td>
                        <td className="left">maestro_dirigent@gmail.com</td>
                        <td>Super-admin</td>
                        <td><i title="DELETE USER" class="fas fa-trash"></i></td>
                    </tr>
                    <tr>
                        <td><input type="checkbox" name="user"></input></td>
                        <td className="left">tihi.javor55</td>
                        <td>87dbB9B</td>
                        <td className="left">zlatnaribica@outlook.com</td>
                        <td>User</td>
                        <td><i title="DELETE USER" class="fas fa-trash"></i></td>
                    </tr>
                    <tr>
                        <td><input type="checkbox" name="user"></input></td>
                        <td className="left">kolaps222</td>
                        <td>23sHF4f</td>
                        <td className="left">fusnotanote@gmail.com</td>
                        <td>User</td>
                        <td><i title="DELETE USER" class="fas fa-trash"></i></td>
                    </tr>
                    <tr>
                        <td><input type="checkbox" name="user"></input></td>
                        <td className="left">kantridazauvijek</td>
                        <td>iu2Dh97</td>
                        <td className="left">belosamobelo@outlook.com</td>
                        <td>User</td>
                        <td><i title="DELETE USER" class="fas fa-trash"></i></td>
                    </tr>
                    <tr>
                        <td><input type="checkbox" name="user"></input></td>
                        <td className="left">triceps22</td>
                        <td>b86HF8v</td>
                        <td className="left">mrkimedvjed@gmail.com</td>
                        <td>Admin</td>
                        <td><i title="DELETE USER" class="fas fa-trash"></i></td>
                    </tr>
                    <tr>
                        <td><input type="checkbox" name="user"></input></td>
                        <td className="left">wick.john</td>
                        <td>L87Z6V5</td>
                        <td className="left">gramnagram@hotmail.com</td>
                        <td>Super-admin</td>
                        <td><i title="DELETE USER" class="fas fa-trash"></i></td>
                    </tr>
                    <tr>
                        <td><input type="checkbox" name="user"></input></td>
                        <td className="left">nocna.ptica</td>
                        <td>32a8u9B</td>
                        <td className="left">zmajevognijezdo@outlook.com</td>
                        <td>User</td>
                        <td><i title="DELETE USER" class="fas fa-trash"></i></td>
                    </tr>
                </tbody>
            </table>
        )
    }
}

export default Users