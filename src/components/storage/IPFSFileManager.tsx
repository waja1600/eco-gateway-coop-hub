
import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Upload, Download, File, Image, Trash2, Copy, ExternalLink } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface IPFSFile {
  id: string;
  name: string;
  hash: string;
  size: number;
  type: string;
  uploadDate: Date;
  url?: string;
}

export function IPFSFileManager() {
  const [files, setFiles] = useState<IPFSFile[]>([
    {
      id: '1',
      name: 'contract-template.pdf',
      hash: 'QmYjtig7VJQ6XsnUjqqJvj7QaMcCAwtrgNdahSiFofrE7o',
      size: 256000,
      type: 'application/pdf',
      uploadDate: new Date(2024, 11, 1),
      url: 'https://ipfs.io/ipfs/QmYjtig7VJQ6XsnUjqqJvj7QaMcCAwtrgNdahSiFofrE7o'
    },
    {
      id: '2',
      name: 'product-image.jpg',
      hash: 'QmQeEyDPA47h8CKii9LBw9fYcf8U8CcP6dD8gVt6hNvBDj',
      size: 1024000,
      type: 'image/jpeg',
      uploadDate: new Date(2024, 10, 15),
      url: 'https://ipfs.io/ipfs/QmQeEyDPA47h8CKii9LBw9fYcf8U8CcP6dD8gVt6hNvBDj'
    }
  ]);

  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const handleFileUpload = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    if (!selectedFiles || selectedFiles.length === 0) return;

    const file = selectedFiles[0];
    setIsUploading(true);
    setUploadProgress(0);

    try {
      // Simulate file upload to IPFS
      const uploadInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 100) {
            clearInterval(uploadInterval);
            return 100;
          }
          return prev + 10;
        });
      }, 200);

      // Simulate upload delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Generate fake IPFS hash
      const fakeHash = `Qm${Math.random().toString(36).substr(2, 44)}`;
      
      const newFile: IPFSFile = {
        id: Date.now().toString(),
        name: file.name,
        hash: fakeHash,
        size: file.size,
        type: file.type,
        uploadDate: new Date(),
        url: `https://ipfs.io/ipfs/${fakeHash}`
      };

      setFiles(prev => [...prev, newFile]);
      
      toast({
        title: "تم الرفع بنجاح",
        description: `تم رفع الملف ${file.name} إلى IPFS`,
      });

    } catch (error) {
      toast({
        title: "خطأ في الرفع",
        description: "فشل في رفع الملف إلى IPFS",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  }, [toast]);

  const copyHashToClipboard = (hash: string) => {
    navigator.clipboard.writeText(hash);
    toast({
      title: "تم النسخ",
      description: "تم نسخ hash الملف إلى الحافظة",
    });
  };

  const deleteFile = (fileId: string) => {
    setFiles(prev => prev.filter(file => file.id !== fileId));
    toast({
      title: "تم الحذف",
      description: "تم حذف الملف من القائمة",
    });
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (type: string) => {
    if (type.startsWith('image/')) {
      return <Image className="h-5 w-5 text-blue-600" />;
    }
    return <File className="h-5 w-5 text-gray-600" />;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            مدير الملفات IPFS
          </CardTitle>
          <CardDescription>
            رفع وإدارة الملفات باستخدام نظام IPFS اللامركزي
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <div className="space-y-2">
              <p className="text-sm text-gray-600">اسحب الملفات هنا أو انقر للتصفح</p>
              <input
                type="file"
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
                disabled={isUploading}
              />
              <Button 
                variant="outline" 
                onClick={() => document.getElementById('file-upload')?.click()}
                disabled={isUploading}
              >
                اختر الملفات
              </Button>
            </div>
          </div>

          {isUploading && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>جاري الرفع...</span>
                <span>{uploadProgress}%</span>
              </div>
              <Progress value={uploadProgress} className="w-full" />
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>الملفات المرفوعة</CardTitle>
          <CardDescription>
            {files.length} ملف مخزن في IPFS
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {files.map((file) => (
              <div key={file.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex items-center gap-3">
                  {getFileIcon(file.type)}
                  <div>
                    <p className="font-medium">{file.name}</p>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <span>{formatFileSize(file.size)}</span>
                      <span>•</span>
                      <span>{file.uploadDate.toLocaleDateString('ar-SA')}</span>
                    </div>
                    <div className="flex items-center gap-1 mt-1">
                      <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                        {file.hash.substring(0, 20)}...
                      </code>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyHashToClipboard(file.hash)}
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {file.url && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => window.open(file.url, '_blank')}
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      const link = document.createElement('a');
                      link.href = file.url || `https://ipfs.io/ipfs/${file.hash}`;
                      link.download = file.name;
                      link.click();
                    }}
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteFile(file.id)}
                  >
                    <Trash2 className="h-4 w-4 text-red-600" />
                  </Button>
                </div>
              </div>
            ))}

            {files.length === 0 && (
              <div className="text-center py-8">
                <File className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <p className="text-gray-600">لم يتم رفع أي ملفات بعد</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
