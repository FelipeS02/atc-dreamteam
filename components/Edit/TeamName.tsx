'use client';
import {
  ChangeEvent,
  Dispatch,
  FC,
  PropsWithChildren,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import { TeamShield } from '../TeamResume';
import { Button } from '../ui/button';
import { ClipboardPenLine, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Skeleton } from '../ui/skeleton';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { AxiosError } from 'axios';
import api from '@/lib/api';
import { TeamInfo } from '@/models/pages/editTeam.model';
import { DialogProps } from '@radix-ui/react-dialog';
import { AlertDialogTrigger } from '../ui/alert-dialog';
interface Props {
  name: string;
  valid: boolean;
  loading: boolean;
  className?: string;
  teamId: number;
  setInfo: Dispatch<SetStateAction<TeamInfo>>;
}

interface EditModalProps
  extends PropsWithChildren,
    Pick<Props, 'name' | 'teamId' | 'setInfo'>,
    Pick<DialogProps, 'onOpenChange' | 'open'> {
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const EditModal: FC<EditModalProps> = ({
  name,
  children,
  teamId,
  setInfo,
  onOpenChange,
  open,
  setOpen,
}) => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [newName, setNewName] = useState('');

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setNewName(value);
  };

  const onSave = async () => {
    try {
      setLoading(true);

      await api.get(`/api/user/teams/${teamId}/edit/name?name=${newName}`);

      setInfo((prev) => ({ ...prev, team: { ...prev.team, name: newName } }));

      setOpen(false);
    } catch (err) {
      const error = err as AxiosError;
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => setNewName(name), [name]);

  const disableSave = newName === name || newName.length === 0;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {/* Children must have DialogTrigger inside */}
      {children}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar nombre</DialogTitle>
          <DialogDescription>
            Introduce el nuevo nombre de tu equipo
          </DialogDescription>
        </DialogHeader>

        <div className='flex flex-col gap-2'>
          <Label htmlFor='name' className='sr-only'>
            Link
          </Label>
          <Input id='name' type='text' value={newName} onChange={onChange} />
          {error ? (
            <Label htmlFor='name' className='text-destructive'>
              {error}
            </Label>
          ) : null}
          <Button
            disabled={disableSave}
            onClick={onSave}
            variant={'default'}
            className='w-fit'
          >
            {!loading ? 'Guardar cambios' : 'Guardando'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const TeamName: FC<Props> = ({
  valid,
  name,
  className,
  loading,
  teamId,
  setInfo,
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <EditModal
      name={name}
      teamId={teamId}
      setInfo={setInfo}
      open={modalOpen}
      onOpenChange={setModalOpen}
      setOpen={setModalOpen}
    >
      <div
        className={cn(
          'p-3 px-1 bg-background flex items-center rounded-md',
          className
        )}
      >
        <TeamShield valid={valid} />
        <div className='flex flex-col flex-grow gap-2'>
          {!loading ? (
            <>
              <h1 className='text-4xl font-koho font-bold'>{name}</h1>
              <div className='flex gap-2'>
                <Button
                  variant={'outline'}
                  size={'sm'}
                  className='w-fit'
                  asChild
                >
                  <DialogTrigger>
                    <ClipboardPenLine size={18} /> Editar nombre
                  </DialogTrigger>
                </Button>
                <Button
                  variant={'destructive'}
                  size={'sm'}
                  className='w-fit'
                  asChild
                  disabled={!valid}
                >
                  <AlertDialogTrigger>
                    <X size={18} /> Eliminar equipo
                  </AlertDialogTrigger>
                </Button>
              </div>
            </>
          ) : (
            <>
              <Skeleton className='h-10 w-[50%]' />
              <Skeleton className='h-8 w-[120px]' />
            </>
          )}
        </div>
      </div>
    </EditModal>
  );
};

export default TeamName;
