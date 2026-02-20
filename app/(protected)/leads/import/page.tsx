'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/authStore';
import { Button } from '@/components/ui';
import {
  Upload,
  FileSpreadsheet,
  CheckCircle,
  AlertCircle,
  ChevronRight,
  Download
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import Papa, { ParseResult } from 'papaparse';

const IMPORT_STEPS = [
  { id: 1, title: 'Upload CSV' },
  { id: 2, title: 'Map Fields' },
  { id: 3, title: 'Preview' },
  { id: 4, title: 'Import' },
];

const FIELD_MAPPINGS = {
  first_name: ['first_name', 'firstname', 'fname', 'given_name'],
  last_name: ['last_name', 'lastname', 'lname', 'surname'],
  email: ['email', 'e-mail', 'email_address'],
  phone: ['phone', 'phone_number', 'mobile', 'telephone'],
  budget_min: ['budget_min', 'min_budget', 'budget_minimum', 'price_min'],
  budget_max: ['budget_max', 'max_budget', 'budget_maximum', 'price_max'],
  property_type: ['property_type', 'propertytype', 'home_type'],
  location_preference: ['location', 'city', 'area', 'preference'],
  lead_source: ['lead_source', 'source', 'lead_source_type'],
  notes: ['notes', 'comments', 'description', 'additional_info'],
};

export default function ImportLeadsPage() {
  const router = useRouter();
  const { user } = useAuthStore();
  const [currentStep, setCurrentStep] = useState(1);
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [csvData, setCsvData] = useState<any[]>([]);
  const [headers, setHeaders] = useState<string[]>([]);
  const [fieldMapping, setFieldMapping] = useState<Record<string, string>>({});
  const [importing, setImporting] = useState(false);
  const [importResult, setImportResult] = useState<{
    success: number;
    failed: number;
    duplicates: number;
    errors: string[];
  } | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith('.csv')) {
      alert('Please upload a CSV file');
      return;
    }

    setCsvFile(file);

    Papa.parse(file, {
      header: true,
      complete: (results: ParseResult<any>) => {
        const data = results.data as any[];
        setCsvData(data);
        setHeaders(Object.keys(data[0] || {}));
        
        // Auto-map fields
        const autoMapping: Record<string, string> = {};
        Object.entries(FIELD_MAPPINGS).forEach(([field, possibleHeaders]) => {
          const matchedHeader = possibleHeaders.find(h =>
            headers.some(header => header.toLowerCase().includes(h.toLowerCase()))
          );
          if (matchedHeader) {
            autoMapping[field] = matchedHeader;
          }
        });
        setFieldMapping(autoMapping);
        setCurrentStep(2);
      },
      error: (error: any) => {
        alert('Error parsing CSV: ' + error.message);
      },
    });
  };

  const handleFieldMappingChange = (field: string, csvHeader: string) => {
    setFieldMapping(prev => ({
      ...prev,
      [field]: csvHeader,
    }));
  };

  const getMappedData = () => {
    return csvData.map(row => {
      const mapped: any = {
        user_id: user?.id,
        status: 'new',
        score: 0,
      };
      
      Object.entries(fieldMapping).forEach(([field, csvHeader]) => {
        if (csvHeader && row[csvHeader]) {
          mapped[field] = row[csvHeader];
        }
      });

      return mapped;
    });
  };

  const handlePreview = () => {
    setCurrentStep(3);
  };

  const handleImport = async () => {
    setImporting(true);
    const mappedData = getMappedData();
    
    try {
      // In a real implementation, you would:
      // 1. Check for duplicates
      // 2. Insert in batches
      // 3. Track import progress
      // 4. Create audit log
      
      // Simulate import
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setImportResult({
        success: mappedData.length,
        failed: 0,
        duplicates: 0,
        errors: [],
      });
      setCurrentStep(4);
    } catch (error) {
      setImportResult({
        success: 0,
        failed: mappedData.length,
        duplicates: 0,
        errors: ['Import failed'],
      });
    } finally {
      setImporting(false);
    }
  };

  const downloadTemplate = () => {
    const template = [
      {
        first_name: 'John',
        last_name: 'Doe',
        email: 'john@example.com',
        phone: '555-0123',
        budget_min: '300000',
        budget_max: '500000',
        property_type: 'single_family',
        location: 'Downtown',
        lead_source: 'website',
        notes: 'Interested in 3+ bedroom homes',
      },
    ];
    
    const csv = Papa.unparse(template);
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'leads-template.csv';
    a.click();
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="mb-4"
        >
          ← Back
        </Button>
        <h1 className="text-3xl font-bold text-gray-900">Import Leads</h1>
        <p className="text-gray-600 mt-1">Bulk import leads from a CSV file</p>
      </div>

      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {IMPORT_STEPS.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full ${
                  currentStep >= step.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}
              >
                {currentStep > step.id ? (
                  <CheckCircle className="h-5 w-5" />
                ) : (
                  step.id
                )}
              </div>
              <span className={`ml-2 text-sm font-medium ${
                currentStep >= step.id ? 'text-blue-600' : 'text-gray-500'
              }`}>
                {step.title}
              </span>
              {index < IMPORT_STEPS.length - 1 && (
                <ChevronRight className="h-5 w-5 mx-4 text-gray-400" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step 1: Upload */}
      {currentStep === 1 && (
        <Card>
          <CardHeader>
            <CardTitle>Upload CSV File</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-2 text-sm text-gray-600">
                  Drag and drop your CSV file here, or click to select
                </p>
                <input
                  type="file"
                  accept=".csv"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="csv-upload"
                />
                <label htmlFor="csv-upload">
                  <Button asChild className="mt-4">
                    <span>Choose File</span>
                  </Button>
                </label>
                {csvFile && (
                  <p className="mt-2 text-sm text-gray-900 font-medium">
                    {csvFile.name}
                  </p>
                )}
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-medium text-blue-900 mb-2">CSV Format Requirements</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Maximum file size: 10MB</li>
                  <li>• Supported columns: first_name, last_name, email, phone, budget_min, budget_max, property_type, location, lead_source, notes</li>
                  <li>• Date format: YYYY-MM-DD</li>
                  <li>• Phone numbers: include country code</li>
                </ul>
              </div>

              <div className="flex justify-end">
                <Button
                  onClick={downloadTemplate}
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <Download className="h-4 w-4" />
                  Download Template
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 2: Field Mapping */}
      {currentStep === 2 && (
        <Card>
          <CardHeader>
            <CardTitle>Map Fields</CardTitle>
            <p className="text-sm text-gray-600 mt-2">
              Match your CSV columns to CRM fields
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(FIELD_MAPPINGS).map(([field, possibleHeaders]) => (
                <div key={field} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                  <label className="md:col-span-3 text-sm font-medium text-gray-700 capitalize">
                    {field.replace('_', ' ')}
                  </label>
                  <select
                    className="md:col-span-6 px-3 py-2 border border-gray-300 rounded-md"
                    value={fieldMapping[field] || ''}
                    onChange={(e) => handleFieldMappingChange(field, e.target.value)}
                  >
                    <option value="">-- Skip this field --</option>
                    {headers.map(header => (
                      <option key={header} value={header}>{header}</option>
                    ))}
                  </select>
                  <div className="md:col-span-3 text-sm text-gray-500">
                    {possibleHeaders.join(', ')}
                  </div>
                </div>
              ))}

              <div className="flex justify-between pt-4">
                <Button variant="outline" onClick={() => setCurrentStep(1)}>
                  Back
                </Button>
                <Button onClick={handlePreview}>
                  Preview Data
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 3: Preview */}
      {currentStep === 3 && (
        <Card>
          <CardHeader>
            <CardTitle>Preview Import Data</CardTitle>
            <p className="text-sm text-gray-600 mt-2">
              Review your data before importing
            </p>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    {Object.keys(fieldMapping).filter(f => fieldMapping[f]).map(field => (
                      <th key={field} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {field.replace('_', ' ')}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {csvData.slice(0, 5).map((row, index) => (
                    <tr key={index}>
                      {Object.entries(fieldMapping)
                        .filter(([_, csvHeader]) => csvHeader)
                        .map(([field, csvHeader]) => (
                          <td key={field} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {row[csvHeader] || '-'}
                          </td>
                        ))}
                    </tr>
                  ))}
                </tbody>
              </table>
              {csvData.length > 5 && (
                <p className="text-sm text-gray-500 mt-2 text-center">
                  ... and {csvData.length - 5} more rows
                </p>
              )}
            </div>

            <div className="flex justify-between pt-4">
              <Button variant="outline" onClick={() => setCurrentStep(2)}>
                Back
              </Button>
              <Button onClick={handleImport} disabled={importing}>
                {importing ? 'Importing...' : `Import ${csvData.length} Leads`}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 4: Results */}
      {currentStep === 4 && importResult && (
        <Card>
          <CardHeader>
            <CardTitle>Import Complete</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                  <CheckCircle className="mx-auto h-8 w-8 text-green-600 mb-2" />
                  <p className="text-2xl font-bold text-green-900">{importResult.success}</p>
                  <p className="text-sm text-green-700">Successfully imported</p>
                </div>
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
                  <AlertCircle className="mx-auto h-8 w-8 text-red-600 mb-2" />
                  <p className="text-2xl font-bold text-red-900">{importResult.failed}</p>
                  <p className="text-sm text-red-700">Failed</p>
                </div>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
                  <AlertCircle className="mx-auto h-8 w-8 text-yellow-600 mb-2" />
                  <p className="text-2xl font-bold text-yellow-900">{importResult.duplicates}</p>
                  <p className="text-sm text-yellow-700">Duplicates skipped</p>
                </div>
              </div>

              {importResult.errors.length > 0 && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h4 className="font-medium text-red-900 mb-2">Errors</h4>
                  <ul className="text-sm text-red-800 space-y-1">
                    {importResult.errors.map((error, index) => (
                      <li key={index}>• {error}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => router.push('/leads')}>
                  View All Leads
                </Button>
                <Button onClick={() => {
                  setCurrentStep(1);
                  setCsvFile(null);
                  setCsvData([]);
                  setHeaders([]);
                  setFieldMapping({});
                  setImportResult(null);
                }}>
                  Import More
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
