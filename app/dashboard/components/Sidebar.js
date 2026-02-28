import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Layout } from 'lucide-react'
import UploadPdfDialog from './UploadPdfDialog'

const Sidebar = () => {
  return (
    <div className='shadow-sm h-screen p-4'>
        <div className='flex'>
        <Image src="/logo.svg" alt="logo" width={50} height={50} />
        <h1 className='text-2xl font-bold ml-2'>NoteWise</h1>
        </div>
        <div className='mt-10'>
            <UploadPdfDialog>    
            <Button className="w-full">
                + Upload PDF
            </Button>
            </UploadPdfDialog>
            <div className='flex gap-2 items-center p-3 mt-5 hover:bg-slate-100 rounded-lg cursor-pointer'>
                <Layout/>
                <h2>Workspace</h2>
            </div>
        </div>
    </div>
  )
}

export default Sidebar