"use client"
import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useMutation } from 'convex/react'
import { Loader2 } from 'lucide-react'
import { api } from '@/convex/_generated/api'
import uuid4 from 'uuid4'
import { useUser } from '@clerk/nextjs'

const UploadPdfDialog = ({children}) => {

  const generateUploadUrl = useMutation(api.fileStorage.generateUploadUrl);
  const AddFile = useMutation(api.fileStorage.AddFile);
  const getFileUrl = useMutation(api.fileStorage.getFileUrl);
  const {user} = useUser();

  const [file,setfile] = useState();
  const [loading,setloading]= useState(false);
  const [fileName,setfileName] = useState();

  const OnUpload = async () =>{
    setloading(true);

    const postUrl = await generateUploadUrl();
    const result = await fetch(postUrl, {
      method: "POST",
      headers: { "Content-Type": file.type },
      body: file,
    });

    const {storageId} = await result.json();
    console.log(storageId);
    const fileId = uuid4();
    const fileUrl = await getFileUrl({storageId:storageId});

    const res = await AddFile({
        fileId:fileId,
        storageId:storageId,
        fileName:fileName,
        fileUrl:fileUrl,
        createdBy: user?.primaryEmailAddress?.emailAddress
    })

    setloading(false);
  }

  const OnFileSelect = (event) =>{
    setfile(event.target.files[0]);
  }

  return (
    <Dialog>
  <DialogTrigger asChild>
    {children}
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Upload PDF File</DialogTitle>
      <DialogDescription asChild>
        <div className=''>
                <h2 className='mt-5'>
                    Select a PDF file to Upload
                </h2>
            <div className='p-3 rounded-md border'>
                <input type="file" accept="/application/pdf"
                onChange={(event)=> OnFileSelect(event)} />
            </div>
            <div className='mt-2'>
                <label>File Name</label>
                <Input placeholder="Enter file name" onChange={(e)=>setfileName(e.target.value)}/>
            </div>
        </div>
      </DialogDescription>
    </DialogHeader>
    <DialogFooter className="sm:justify-end">
          <DialogClose asChild>
            <Button type="button" variant='secondary'>
                Close
            </Button>
          </DialogClose>
          <Button onClick={OnUpload}>
            {loading ? <Loader2 className="animate-spin"/>:"Upload"}
          </Button>
        </DialogFooter>
  </DialogContent>
</Dialog>
  )
}

export default UploadPdfDialog