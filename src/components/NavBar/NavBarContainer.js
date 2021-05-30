import React from 'react'
import Profile from './Profile'
import FileExplorer from './FileExplorer'
import Signout from './Signout'

export default function NavBarContainer() {
  return (
    <div className="NavBarContainer">
      <Profile />
      <FileExplorer />
      <Signout/>
    </div>
  )
}
