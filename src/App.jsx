import React,{ Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import axios from 'axios'

class App extends Component{
    constructor(){
        super()
        this.state={
            email:'',
            password:'',
            msg:"",
            userdata:[],
            isLoginpage:true,
            isvaliduser:false
        }
        this.onEmailChange=this.onEmailChange.bind(this);
        this.onPasswordChange=this.onPasswordChange.bind(this);
        this.onSubmitdata=this.onSubmitdata.bind(this);
        this.onclose=this.onclose.bind(this);
        this.onLoginclick=this.onLoginclick.bind(this);
        this.onSignuphere=this.onSignuphere.bind(this);
        this.onbacklogin=this.onbacklogin.bind(this);
    }
    componentDidMount(){
        axios.get('http://localhost:4000/app/getdata')
        .then(response=> {
            
            console.log("getdata",response.data)
            this.setState({
                userdata: response.data
            })
            
        })
    }

    onEmailChange=(e)=>{
        this.setState({
            email:e.target.value,
            msg:""
        })
    }

    onPasswordChange=(e)=>{
        this.setState({
            password:e.target.value,
            msg:""
        })
    }
    onSubmitdata(){
        debugger
        //preventDefault()
        if(this.state.email!='' && this.state.email!="" && this.state.email!=undefined &&
        this.state.password!='' && this.state.password!="" && this.state.password!=undefined){
                const register={
                    email : this.state.email,
                    password : this.state.password
                }
                axios.post('http://localhost:4000/app/signup', register)
                .then(response=> {
                    
                    console.log("response",response)

                    
                })
                
                this.setState({
                    email:'',
                    password:'',
                    isvaliduser:true,
                    msg:"You have successfully signed up "
                })
        }
        else{
            this.setState({
                msg:"Please fill all details"
            })
        }

    }
    onLoginclick(){
        if(this.state.email!='' && this.state.email!="" && this.state.email!=undefined &&
        this.state.password!='' && this.state.password!="" && this.state.password!=undefined){
        let count=0
        var isvalid=false
        if(this.state.userdata.length>0){

            this.state.userdata.map(rec=>{
                if(rec.email==this.state.email && rec.password==this.state.password && count==0){
                    this.setState({
                        isvaliduser:true
                    })
                    isvalid=true
                    count=count+1;
                }
                
            })
            if(isvalid==false){
                this.setState({
                    msg:"You are new user. Please sign up"
                })
            }

        }
        else{}
    }
    else{
        this.setState({
            msg:"Please fill all details"
        })
    }
    }

    onclose(){
        this.setState({
            msg:""
        })
    }
    onSignuphere(){
        this.setState({
            email:'',
            password:'',
            isLoginpage:false,
            isvaliduser:false,
            msg:""
        })
    }

    onbacklogin(){
        this.setState({
            email:'',
            password:'',
            isLoginpage:true,
            isvaliduser:false,
            msg:""
        })
    }
    render(){
        console.log("userdata",this.state.userdata)
        return(
            <div class="align-middle">
                {!this.state.isvaliduser ?
            
                <div className="container border border-warning" style={{height:"500px",backgroundColor:'yellowgreen'}}>
                
                    <div className="form-div mt-5 ">
                    <div className='text-center'> <h1>LOGIN-SIGNUP</h1></div>
                    {this.state.msg==""?"":
                        <div>
                            <h4>{this.state.msg}<button onClick={this.onclose} >X</button></h4>
                        </div>
                    }
                    <div className='align-middle'>
                        {/* <form onSubmit={this.onSubmitdata}> */}
                            <input type="text"
                            placeholder="Email"
                            onChange={this.onEmailChange}
                            value={this.state.email}
                            className='form-control form-group'
                            style={{height:"60px", width:"50%"}}
                            />

                            <input type="text"
                            placeholder="Password"
                            onChange={this.onPasswordChange}
                            value={this.state.password}
                            className='form-control form-group'
                            style={{height:"60px", width:"50%"}}
                            />

                            
                            {this.state.isLoginpage==true?
                            <div>
                                <button type="button" class="btn btn-success" onClick={this.onLoginclick} >Login</button>
                                <h4 className='mt-1'>OR</h4>
                                <button type="button" class="btn btn-success" onClick={this.onSignuphere} >Sign up here..</button>
                            </div>

                                :
                            <div>
                                <button type="button" class="btn btn-success" onClick={this.onSubmitdata} >Sign up</button>
                                <h4 className='mt-1'>OR</h4>
                                <button type="button" class="btn btn-success" onClick={this.onbacklogin} >Back to Login</button>
                            </div>
                            }
                            </div>
                            
                        {/* </form> */}
                    </div>
                </div>
                :
                <div className='container border border-warning'  style={{height:"500px",backgroundColor:'grey'}}>
                    {this.state.msg==""?"":
                        <div class="border border-success text-center">
                            <h4 style={{color:"yellow"}}>{this.state.msg}<button onClick={this.onclose} >x</button></h4>
                        </div>
                    }
                    <div className='text-center' >
                        <h1 className='mt-5 mb-5'>------ Welcome ------</h1>

                        <button type="button" class="btn btn-success" onClick={this.onbacklogin} >Back to Login</button>

                    </div>
                </div>

                }
            </div>

        )
    }
}
export default App;