import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { SendIcon } from 'lucide-react';
import { instance } from '../../../axios';

const SendMessagePage = () => {

  const handleSendMessage = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    const data = {
      recipientType: formData.get('recipientType'),
      phoneNumbers: formData.get('phoneNumbers'),
      messageText: formData.get('messageText')
    };

    try {
      const response = await instance.post('/admin_control/send/message/to/client', data);
      console.log('Success:', response.data);
    } catch (error) {
      console.error('Error:', error);
      // Handle error (e.g., show an error message)
    }
  };



  return (
    <div className='bg-muted rounded-md p-8 md:w-1/2 w-full mx-auto mt-10'>
      <h1 className='text-xl font-bold mb-4'>এসএমএস</h1>
      <form className='' onSubmit={handleSendMessage}>
        <div className='flex flex-col items-center gap-2 mb-5'>
          <select name="recipientType" className='w-full py-2 rounded-md'>
            <option value="কাস্টমার">কাস্টমার</option>
            <option value="সরবরাহকারী">সরবরাহকারী</option>
            <option value="কর্মী">কর্মী</option>
          </select>
        </div>
        <div className="flex flex-col items-start gap-2 ">
          <Label htmlFor="phoneNumbers" className="text-right">
            মোবাইল নম্বর
          </Label>
          <Input
            name="phoneNumbers"
            id="phoneNumbers"
            placeholder="EX: 017654254788, 01985465895"
            className="col-span-3"
          />
        </div>
        <div className="flex flex-col items-start gap-2 mt-5">
          <Label htmlFor="messageText" className="text-right">
            এসএমএস টেক্সট
          </Label>
          <Textarea id="messageText" name="messageText" className="col-span-3" />
        </div>
        <div className='mt-5'>
          <Button type="submit" variant={"destructive"}> <SendIcon className='mr-2' size={20} /> সেন্ড এসএমএস</Button>
        </div>
      </form>
    </div>
  );
}

export default SendMessagePage;
