USE bowers_center;

DROP TABLE IF EXISTS bowers_data;

CREATE TABLE bowers_data(
   date DATE NOT NULL,
   weekday TEXT NOT NULL,
   busy LONGTEXT NOT NULL
);




-- Example INSERTing many rows (omitting AUTO_INCREMENTEd id value)
INSERT INTO bowers_data(date, weekday, busy)
VALUES
  ('2022-11-20', "Sunday", '{
        "count": [
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            10,
            15,
            13,
            17,
            25,
            28,
            33,
            20,
            15,
            14,
            18,
            22,
            29,
            23,
            29,
            18,
            15,
            15,
            11
        ]
    }'),
  ('2022-11-21', "Monday", '{
        "count": [
            6,
            7,
            10,
            8,
            10,
            12,
            14,
            20,
            22,
            25,
            23,
            27,
            25,
            30,
            43,
            50,
            55,
            64,
            66,
            59,
            58,
            43,
            39,
            36,
            25,
            15,
            10
        ]
    }'),
  ('2022-11-22', "Tuesday", '{
        "count": [
            7,
            12,
            10,
            9,
            10,
            15,
            14,
            29,
            32,
            35,
            33,
            47,
            35,
            40,
            53,
            57,
            52,
            44,
            46,
            69,
            58,
            43,
            29,
            16,
            15,
            10,
            7
        ]
    }'),
  ('2022-11-23', "Wednesday", '{
        "count": [
            1,
            2,
            13,
            4,
            15,
            16,
            17,
            28,
            29,
            20,
            21,
            22,
            23,
            34,
            45,
            56,
            57,
            68,
            69,
            50,
            51,
            42,
            33,
            34,
            25,
            16,
            12
        ]
    }'),
  ('2022-11-24', "Thursday", '{
        "count": [
            9,
            8,
            17,
            6,
            15,
            14,
            13,
            22,
            21,
            20,
            29,
            28,
            27,
            36,
            45,
            54,
            53,
            62,
            61,
            50,
            59,
            48,
            37,
            36,
            25,
            14,
            11
        ]
    }'),
  ('2022-11-25', "Friday", '{
        "count": [
            0,
            1,
            12,
            3,
            14,
            15,
            16,
            27,
            28,
            29,
            20,
            28,
            26,
            34,
            42,
            50,
            59,
            67,
            65,
            53,
            51,
            40,
            30,
            30,
            20,
            10,
            6
        ]
    }'),
  ('2022-11-26', "Saturday", '{
        "count": [
            0,
            0,
            0,
            0,
            0,
            5,
            10,
            25,
            20,
            25,
            27,
            30,
            23,
            22,
            24,
            20,
            24,
            34,
            23,
            29,
            25,
            22,
            31,
            15,
            10,
            4,
            4
        ]
    }');