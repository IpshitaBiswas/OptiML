import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useFinancialStore } from '../services/dataStore';
import { toast } from './ui/use-toast';
import { useNavigate } from 'react-router-dom';

const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB

const formSchema = z.object({
  companyName: z.string().min(1, 'Company name is required'),
  annualReport: z.any()
    .refine((file) => file?.[0] instanceof File, "Annual Report is required")
    .refine((file) => file?.[0]?.size <= MAX_FILE_SIZE, "Max file size is 50MB")
    .refine(
      (file) => file?.[0]?.type === "application/pdf",
      "Only PDF files are accepted"
    ),
  financialStatements: z.any()
    .refine((file) => file?.[0] instanceof File, "Financial Statements are required")
    .refine((file) => file?.[0]?.size <= MAX_FILE_SIZE, "Max file size is 50MB")
    .refine(
      (file) => ["application/vnd.ms-excel", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"].includes(file?.[0]?.type),
      "Only Excel files are accepted"
    )
});

type FormData = z.infer<typeof formSchema>;

export const FileUploadForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { processFiles } = useFinancialStore();
  const navigate = useNavigate();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<FormData>({
    resolver: zodResolver(formSchema)
  });

  const onSubmit = async (data: FormData) => {
    try {
      setIsLoading(true);
      console.log('Starting file processing...', {
        companyName: data.companyName,
        annualReportName: data.annualReport[0].name,
        financialStatementsName: data.financialStatements[0].name
      });
      
      // Store company name in sessionStorage
      sessionStorage.setItem('companyName', data.companyName);
      
      // Process files
      await processFiles(
        data.annualReport[0],
        data.financialStatements[0],
        data.companyName
      );
      
      console.log('Files processed successfully');
      
      toast({
        title: 'Success',
        description: 'Files processed successfully. Redirecting to dashboard...',
      });
      
      // Add a small delay before redirecting
      setTimeout(() => {
        navigate('/financial-dashboard');
      }, 1500);
      
      // Reset form
      reset();
      
    } catch (error) {
      console.error('Error processing files:', error);
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'An error occurred while processing files',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label htmlFor="companyName" className="block text-sm font-medium mb-2">
          Company Name
        </label>
        <Input
          id="companyName"
          {...register('companyName')}
          placeholder="Enter company name"
        />
        {errors.companyName && (
          <p className="text-red-500 text-sm mt-1">{errors.companyName?.message as string}</p>
        )}
      </div>
      
      <div>
        <label htmlFor="annualReport" className="block text-sm font-medium mb-2">
          Annual Report (PDF)
        </label>
        <Input
          id="annualReport"
          type="file"
          accept=".pdf"
          {...register('annualReport')}
        />
        {errors.annualReport && (
          <p className="text-red-500 text-sm mt-1">{errors.annualReport?.message as string}</p>
        )}
      </div>
      
      <div>
        <label htmlFor="financialStatements" className="block text-sm font-medium mb-2">
          Financial Statements (Excel)
        </label>
        <Input
          id="financialStatements"
          type="file"
          accept=".xlsx,.xls"
          {...register('financialStatements')}
        />
        {errors.financialStatements && (
          <p className="text-red-500 text-sm mt-1">{errors.financialStatements?.message as string}</p>
        )}
      </div>
      
      <Button
        type="submit"
        disabled={isLoading}
        className="w-full bg-optiml-purple hover:bg-purple-800"
      >
        {isLoading ? 'Processing...' : 'Process Files'}
      </Button>
    </form>
  );
}; 