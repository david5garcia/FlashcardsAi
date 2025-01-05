import { GameData } from "@/server/services/profile.service";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@mui/material";
import { GameStatus } from "@prisma/client";
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
              <TableCell>Points</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {gameData.map((game) => (
              <TableRow key={game.id}>
                <TableCell>
                  {game.status === GameStatus.COMPLETED
                    ? game.flashcard.word
                    : "••••••"}
                </TableCell>
                <TableCell>
                  <Link
                    className="text-[#4158d0] font-bold"
                    href={`/play/game/${game.id}`}
                  >
                    Link 🔗
                  </Link>
                </TableCell>
                <TableCell>
                  <p
                    className={`${
                      game.status === "COMPLETED"
                        ? "text-green-600"
                        : "text-orange-500"
                    } font-medium`}
                  >
                    {game.status}
                  </p>
                </TableCell>
                <TableCell>{game.flashcard.level}</TableCell>
                <TableCell>{game.conversation._count.messages}</TableCell>
                <TableCell>
                  {new Date(game.createdAt).toLocaleString()}
                </TableCell>
                <TableCell>
                  {game.status === GameStatus.COMPLETED
                    ? Math.max(
                        100 - (game.conversation._count.messages - 1) * 5,
                        40
                      )
                    : ""}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ProfileTable;
