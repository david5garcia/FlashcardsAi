import { GameData } from "@/app/profile/page";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@mui/material";
import Link from "next/link";

const ProfileTable = ({ gameData }: { gameData: GameData }) => {
  return (
    <div className="my-6">
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Word</TableCell>
              <TableCell>Link</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Difficulty</TableCell>
              <TableCell>Guesses</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Mode</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {gameData.map((game) => (
              <TableRow key={game.id}>
                <TableCell>{game.flashcard.word}</TableCell>
                <TableCell>
                  <Link href={`/play/game/${game.id}`}>Link</Link>
                </TableCell>
                <TableCell>
                  <p
                    className={`${
                      game.status === "COMPLETED"
                        ? "text-green-500"
                        : "text-orange-400"
                    } font-semibold`}
                  >
                    {game.status}
                  </p>
                </TableCell>
                <TableCell>{game.flashcard.level}</TableCell>
                <TableCell>{game.conversation._count.messages}</TableCell>
                <TableCell>
                  {new Date(game.createdAt).toLocaleString()}
                </TableCell>
                <TableCell>{game.mode}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ProfileTable;
