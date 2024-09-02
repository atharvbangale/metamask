import { Add } from '@mui/icons-material'
import React from 'react'
import MyLineChart from './charts/MyLineChart'
import FileTypeDistributionPieChart from './charts/FileTypeDistributionPieChart'
import Dashhome from './mainDashboard/Dashhome'
import MyFiles from './mainDashboard/MyFiles'
import ChatAi from './mainDashboard/ChatAi'
import MyImages from './mainDashboard/MyImages'
import Videos from './mainDashboard/Videos'
import Experiences from './mainDashboard/Experiences'
import Profile from './mainDashboard/Profile'
import BuyCoin from './mainDashboard/BuyCoin'
import EditDoc from './mainDashboard/EditDoc'
import Model from './mainDashboard/Model'
import PasswordManager from './mainDashboard/PasswordManager'
import UserAccess from './mainDashboard/UserAccess'
import TransactionDetails from './mainDashboard/TransactionDetails'
import Community from './mainDashboard/Community'


const Main_Dashboard = ({selectedComponent  , contract }) => {



  return (
    <div className="text-white ">
    {selectedComponent ===  '' && <Dashhome  contract={contract} />}
    {selectedComponent === 'MyFiles' && <MyFiles contract={contract} />}
    {selectedComponent === 'Images' && <MyImages  contract={contract}/>}
    {selectedComponent === 'Videos' && <Videos contract={contract}/>}
    {selectedComponent === 'TalkWithAI' && <ChatAi contract={contract}/>}
    {selectedComponent === 'experiences' && <Experiences contract={contract}/>}
    {selectedComponent === 'profile' && <Profile contract={contract}/>}
    {selectedComponent === 'buycoin' && <BuyCoin contract={contract}/>}
    {selectedComponent === 'editdoc' && <EditDoc contract={contract}/>}
    {selectedComponent === '3dmodel' && <Model contract={contract}/>}
    {selectedComponent === 'password' && <PasswordManager contract={contract}/>}
    {selectedComponent === 'access' && <UserAccess contract={contract}/>}
    {selectedComponent === 'details' && <TransactionDetails contract={contract}/>}
    {selectedComponent === 'help' && <Community contract={contract}/>}










    

    </div>
  )
}

export default Main_Dashboard
