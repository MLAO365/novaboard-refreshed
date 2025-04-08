"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Skull, ArrowLeft, Plus, Trash, Edit, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Bounty {
  id: number;
  title: string;
  description: string;
  reward: string;
  status: string;
  dueDate: string;
  assignedTo: number | null;
  createdBy: number;
}

export default function GMBounties() {
  const router = useRouter();
  const [bounties, setBounties] = useState<Bounty[]>([]);
  const [newBounty, setNewBounty] = useState({
    title: "",
    description: "",
    reward: "",
    status: "active",
    dueDate: "",
    assignedTo: null,
    createdBy: 1, // Replace with the actual GM ID
  });
  const [editingBounty, setEditingBounty] = useState<Bounty | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBounties = async () => {
      setLoading(true);
      try {
        const response = await fetch('/api/bounties');
        if (!response.ok) {
          throw new Error('Failed to fetch bounties');
        }
        const data = await response.json();
        setBounties(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBounties();
  }, []);

  const handleAddBounty = async () => {
    try {
      const response = await fetch('/api/bounties', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newBounty),
      });
      if (!response.ok) {
        throw new Error('Failed to add bounty');
      }
      const data = await response.json();
      setBounties([...bounties, data]);
      setNewBounty({
        title: "",
        description: "",
        reward: "",
        status: "active",
        dueDate: "",
        assignedTo: null,
        createdBy: 1, // Replace with the actual GM ID
      });
      setIsAddDialogOpen(false);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleEditBounty = (bounty: Bounty) => {
    setEditingBounty(bounty);
    setIsEditDialogOpen(true);
  };

  const handleUpdateBounty = async () => {
    if (!editingBounty) return;
    try {
      const response = await fetch(`/api/bounties/${editingBounty.id}`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editingBounty),
      });
      if (!response.ok) {
        throw new Error('Failed to update bounty');
      }
      setBounties(bounties.map((b) => (b.id === editingBounty.id ? editingBounty : b)));
      setIsEditDialogOpen(false);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleDeleteBounty = async (id: number) => {
    try {
      const response = await fetch(`/api/bounties/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete bounty");
      }
      setBounties(bounties.filter((b) => b.id !== id));
    } catch (err: any) {
      setError(err.message);
    }
  };

  if (loading) {
    return <p>Loading bounties...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="min-h-screen bg-black text-slate-200">
      {/* Header */}
      <header className="border-b border-red-900/50 bg-black/70 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center">
            <Link href="/gm-dashboard" className="flex items-center text-red-400 hover:text-red-300 mr-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              <span className="text-sm">Back to Dashboard</span>
            </Link>
            <div className="flex items-center">
              <Skull className="h-5 w-5 text-red-500 mr-2" />
              <h1 className="text-xl font-vt323 text-red-500">BOUNTY BOARD MANAGEMENT</h1>
            </div>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="border-red-900/50 text-red-400 hover:bg-red-900/20 hover:text-red-300"
              >
                <Plus className="h-4 w-4 mr-2" />
                ADD BOUNTY
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-black border-red-900/50 text-slate-200 max-w-md">
              <DialogHeader>
                <DialogTitle className="text-red-400">Add New Bounty</DialogTitle>
                <DialogDescription className="text-slate-400">
                  Create a new bounty to be displayed on the bounty board.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="target" className="text-slate-300">
                    Target Name
                  </Label>
                  <Input
                    id="target"
                    value={newBounty.title}
                    onChange={(e) => setNewBounty({ ...newBounty, title: e.target.value })}
                    className="bg-black/50 border-slate-800 text-slate-300"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description" className="text-slate-300">
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    value={newBounty.description}
                    onChange={(e) => setNewBounty({ ...newBounty, description: e.target.value })}
                    className="bg-black/50 border-slate-800 text-slate-300"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="reward" className="text-slate-300">
                      Reward Amount
                    </Label>
                    <Input
                      id="reward"
                      type="text"
                      value={newBounty.reward}
                      onChange={(e) => setNewBounty({ ...newBounty, reward: e.target.value })}
                      className="bg-black/50 border-slate-800 text-slate-300"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="difficulty" className="text-slate-300">
                      Difficulty
                    </Label>
                    <Select value={newBounty.status} onValueChange={(value) => setNewBounty({ ...newBounty, status: value })}>
                      <SelectTrigger className="bg-black/50 border-slate-800 text-slate-300">
                        <SelectValue placeholder="Select difficulty" />
                      </SelectTrigger>
                      <SelectContent className="bg-black border-slate-800 text-slate-300">
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="expired">Expired</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location" className="text-slate-300">
                    Last Known Location
                  </Label>
                  <Input
                    id="location"
                    value={newBounty.dueDate}
                    onChange={(e) => setNewBounty({ ...newBounty, dueDate: e.target.value })}
                    className="bg-black/50 border-slate-800 text-slate-300"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  className="border-slate-800 text-slate-400 hover:bg-slate-900/50"
                  onClick={() => setIsAddDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  className="bg-red-900/50 hover:bg-red-900/70 text-red-400 border border-red-900/50"
                  onClick={handleAddBounty}
                >
                  Add Bounty
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </header>
      {/* Main content */}
      <main className="container mx-auto px-4 py-8">
        <Card className="bg-black/50 border-red-900/50 mb-8">
          <CardHeader>
            <CardTitle className="text-red-400">Active Bounties</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-red-900/30">
                  <TableHead className="text-red-400">Target</TableHead>
                  <TableHead className="text-red-400">Description</TableHead>
                  <TableHead className="text-red-400">Reward</TableHead>
                  <TableHead className="text-red-400">Status</TableHead>
                  <TableHead className="text-red-400">Location</TableHead>
                  <TableHead className="text-red-400">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bounties.map((bounty) => (
                  <TableRow key={bounty.id} className="border-red-900/30">
                    <TableCell className="font-medium text-slate-300">{bounty.title}</TableCell>
                    <TableCell className="text-slate-400">{bounty.description}</TableCell>
                    <TableCell className="text-slate-300">{bounty.reward}</TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          bounty.status === "active"
                            ? "bg-green-900/20 text-green-400"
                            : bounty.status === "completed"
                            ? "bg-yellow-900/20 text-yellow-400"
                            : "bg-red-900/20 text-red-400"
                        }`}
                      >
                        {bounty.status.toUpperCase()}
                      </span>
                    </TableCell>
                    <TableCell className="text-slate-400">{bounty.dueDate}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-slate-400 hover:text-yellow-400 hover:bg-yellow-900/20"
                          onClick={() => handleEditBounty(bounty)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-slate-400 hover:text-red-400 hover:bg-red-900/20"
                          onClick={() => handleDeleteBounty(bounty.id)}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Edit Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="bg-black border-red-900/50 text-slate-200 max-w-md">
            <DialogHeader>
              <DialogTitle className="text-red-400">Edit Bounty</DialogTitle>
              <DialogDescription className="text-slate-400">Update the details of this bounty.</DialogDescription>
            </DialogHeader>
            {editingBounty && (
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-target" className="text-slate-300">
                    Target Name
                  </Label>
                  <Input
                    id="edit-target"
                    value={editingBounty.title}
                    onChange={(e) => setEditingBounty({ ...editingBounty, title: e.target.value })}
                    className="bg-black/50 border-slate-800 text-slate-300"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-description" className="text-slate-300">
                    Description
                  </Label>
                  <Textarea
                    id="edit-description"
                    value={editingBounty.description}
                    onChange={(e) => setEditingBounty({ ...editingBounty, description: e.target.value })}
                    className="bg-black/50 border-slate-800 text-slate-300"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-reward" className="text-slate-300">
                      Reward Amount
                    </Label>
                    <Input
                      id="edit-reward"
                      type="text"
                      value={editingBounty.reward}
                      onChange={(e) => setEditingBounty({ ...editingBounty, reward: e.target.value })}
                      className="bg-black/50 border-slate-800 text-slate-300"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-difficulty" className="text-slate-300">
                      Difficulty
                    </Label>
                    <Select value={editingBounty.status} onValueChange={(value) => setEditingBounty({ ...editingBounty, status: value })}>
                      <SelectTrigger className="bg-black/50 border-slate-800 text-slate-300">
                        <SelectValue placeholder="Select difficulty" />
                      </SelectTrigger>
                      <SelectContent className="bg-black border-slate-800 text-slate-300">
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="expired">Expired</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-location" className="text-slate-300">
                    Last Known Location
                  </Label>
                  <Input
                    id="edit-location"
                    value={editingBounty.dueDate}
                    onChange={(e) => setEditingBounty({ ...editingBounty, dueDate: e.target.value })}
                    className="bg-black/50 border-slate-800 text-slate-300"
                  />
                </div>
              </div>
            )}
            <DialogFooter>
              <Button
                variant="outline"
                className="border-slate-800 text-slate-400 hover:bg-slate-900/50"
                onClick={() => setIsEditDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                className="bg-red-900/50 hover:bg-red-900/70 text-red-400 border border-red-900/50"
                onClick={handleUpdateBounty}
              >
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
}