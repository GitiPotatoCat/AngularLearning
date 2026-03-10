export interface ProjectCard 
{
  id: number;
  title: string;
  description: string;
  status: 'planning' | 'active' | 'completed';
  progress: number;
}