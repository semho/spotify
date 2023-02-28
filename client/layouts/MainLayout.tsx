import Navbar from '@/components/Navbar'
import { Container } from '@mui/system'
import React from 'react'

interface ILayoutProps {
    children?: React.ReactNode
}

const MainLayout = ({children}: ILayoutProps) => {
  return (
    <>
      <Navbar/>
      <Container style={{margin: '90px 0'}}>
        {children}
      </Container>
    </>
  )
}

export default MainLayout
