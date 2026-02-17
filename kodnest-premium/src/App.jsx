import React from 'react';
import { TopBar } from './components/layout/TopBar';
import { ContextHeader } from './components/layout/ContextHeader';
import { PrimaryWorkspace } from './components/layout/PrimaryWorkspace';
import { SecondaryPanel } from './components/layout/SecondaryPanel';
import { ProofFooter } from './components/layout/ProofFooter';
import { Card, CardHeader, CardTitle, CardContent } from './components/ui/Card';
import { Button } from './components/ui/Button';
import { Input } from './components/ui/Input';
import { Badge } from './components/ui/Badge';
import { Database, Plus } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-background text-primary flex flex-col font-sans">
      <TopBar
        projectName="KodNest Premium Build System"
        currentStep={3}
        totalSteps={5}
        status="In Progress"
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <ContextHeader
          title="Define Data Schema"
          description="Create the structure for your application's data. Define tables, relationships, and types to ensure a solid foundation."
        />

        <main className="flex-1 flex overflow-hidden border-t border-primary/10">
          <PrimaryWorkspace>
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xl font-serif font-semibold">Schema Definition</h2>
              <Button variant="secondary" size="sm">
                <Plus className="w-4 h-4 mr-2" /> Add Table
              </Button>
            </div>

            <Card className="mb-6">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="flex items-center gap-2">
                  <Database className="w-5 h-5 text-accent" />
                  <CardTitle className="text-base">Users Table</CardTitle>
                </div>
                <Badge variant="success">Active</Badge>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <Input label="Field Name" placeholder="e.g. id" defaultValue="id" />
                    <Input label="Type" placeholder="e.g. UUID" defaultValue="UUID" />
                    <Input label="Constraints" placeholder="e.g. Primary Key" defaultValue="Primary Key" />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <Input label="Field Name" placeholder="e.g. email" defaultValue="email" />
                    <Input label="Type" placeholder="e.g. Text" defaultValue="Text" />
                    <Input label="Constraints" placeholder="e.g. Unique" defaultValue="Unique, Required" />
                  </div>
                </div>
                <div className="mt-4 flex justify-end">
                  <Button variant="ghost" size="sm" className="text-primary/60">
                    + Add Field
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="flex items-center gap-2">
                  <Database className="w-5 h-5 text-primary/40" />
                  <CardTitle className="text-base text-primary/60">Posts Table</CardTitle>
                </div>
                <Badge variant="secondary">Draft</Badge>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-primary/40 italic py-4">No fields defined yet.</p>
                <Button variant="outline" size="sm">
                  Define Structure
                </Button>
              </CardContent>
            </Card>

          </PrimaryWorkspace>

          <SecondaryPanel
            explanation="Schemas define the shape of your data. Ensure you have a primary key for each table and define foreign key relationships correctly for data integrity."
            promptContent="Create a Users table with id, email, and password_hash fields. Add a Posts table with title, content, and author_id linked to Users."
          />
        </main>
      </div>

      <ProofFooter />
    </div>
  );
}

export default App;
